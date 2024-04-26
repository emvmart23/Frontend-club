import { z } from "zod";

export const UnitSchema = z.object({
    abbreviation: z.string().min(1, { message: "Este campo no puede estar vacío" }),
    description: z.string().min(1, { message: "Este campo no puede estar vacío" })
});