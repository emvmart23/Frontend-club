import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { LoginForm } from "../forms/LoginForm";

export default function LoginCard() {
  return (
    <Card className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[290px] md:w-[33%] h-[25rem]">
      <CardHeader>
        <CardTitle className="text-center pt-5">Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
