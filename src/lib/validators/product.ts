import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const ProductSchema = z.object({
    name: z.string().min(1, { message: requiredErrorMsg }),
    price:z.string().min(1, { message: requiredErrorMsg }),
    category_id: z.number().min(1, { message: requiredErrorMsg }),
    unit_id: z.number().min(1, { message: requiredErrorMsg }),
    has_alcohol: z.boolean()
});