import { z } from "zod";

const messageRequired = "Este campo no puede estar vacio";

export const LoginSchema = z.object({
  user: z.string().min(1, { message: messageRequired }),
  password: z.string().min(1, { message: messageRequired }),
});