import { z } from "zod";

export const RoleSchema = z.object({
    role_name: z.string().min(1, { message: "Este campo no puede estar vacío" })
});