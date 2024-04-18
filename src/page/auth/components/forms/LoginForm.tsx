import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { LoginSchema } from "@/lib/validators/auth";
import { Checkbox } from "@/components/ui/Checkbox";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { InputPassword } from "@/components/InputPassword";

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsPending(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        values
      );
      console.log(response)
        navigate("/");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast({
          title: "Credenciales incorrectas",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ocurrió un error",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[50%] p-10">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="dark:bg-muted dark:brightness-150 dark:text-white h-12"
                  placeholder="Usuario"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <InputPassword
          form={form}
          className="dark:bg-muted dark:brightness-150 dark:text-white h-12"
        />
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0">
                  Recuérdame
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          className="w-full rounded-full"
          type="submit"
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Ingresar
          <span className="sr-only">
            Continuar para restablecer la verificación de contraseña
          </span>
        </Button>
      </form>
    </Form>
  );
}