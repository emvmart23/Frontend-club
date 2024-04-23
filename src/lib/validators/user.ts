import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const MainSchema = z.object({
    name: z
    .string()
    .min(1, {
        message: requiredErrorMsg,
    })
    .trim(),
    user: z.string().min(1, { message: requiredErrorMsg }).trim(),
    role_id: z
    .number()
    .min(1, { message: "Se requiere un correo electronico" })
});

export const PasswordSchema = z.object({
  password: z.string().min(1, { message: requiredErrorMsg }),
  password_confirmation: z.string().min(1, { message: requiredErrorMsg })
});

export const UserSchema = z.intersection(PasswordSchema, MainSchema);