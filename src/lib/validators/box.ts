import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const BoxSchema = z.object({
    user_opening:z.string().min(1, { message: requiredErrorMsg }),
    opening: z.string(),
    initial_balance: z.string().min(1, { message: requiredErrorMsg }),
    final_balance: z.string(),
    state: z.boolean()
});