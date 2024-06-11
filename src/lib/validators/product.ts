import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: requiredErrorMsg }),
  price: z.string().min(1, { message: requiredErrorMsg }),
  category_id: z.number().min(1, { message: requiredErrorMsg }),
  unit_id: z.number().min(1, { message: requiredErrorMsg }),
  has_alcohol: z.boolean(),
});

export const NoteScheme = z.object({
  client_id: z.coerce.number().min(1, { message: requiredErrorMsg }),
  issue_date: z.date({
    required_error: "A date of birth is required.",
  }),
  payment_method: z.string().min(1, { message: requiredErrorMsg }),
  total_price: z.coerce.number().min(1, { message: requiredErrorMsg }),
  reference: z.string().min(1, { message: requiredErrorMsg })
});
