import { z } from "zod";

export const CustomerSchema = z.object({
    name: z.string().min(1, { message: "Este campo no puede estar vacío" })
});