import { z } from "zod";

export const AttendaceSchema = z.object({
    user_id: z.number().min(1, { message: "Este campo no puede estar vacío" }),
    present: z.boolean(),
    late: z.boolean(),
    absent: z.boolean(),
    date: z.date()
});