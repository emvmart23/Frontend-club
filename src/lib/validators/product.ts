import { z } from "zod";

const requiredErrorMsg = "Este campo no puede estar vacío";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: requiredErrorMsg }),
  price: z.string().min(1, { message: requiredErrorMsg }),
  category_id: z.number().min(1, { message: requiredErrorMsg }),
  unit_id: z.number().min(1, { message: requiredErrorMsg }),
  has_alcohol: z.boolean(),
});

export const payment = z.object({
  payment_method: z.string().min(1, { message: requiredErrorMsg }),
  mountain: z.number().min(1, { message: requiredErrorMsg }),
  total_price: z.number().min(1, { message: requiredErrorMsg }),
  reference : z.string().min(1, { message : requiredErrorMsg })
})

export const NoteScheme = z.object({
  client_id: z.number().min(1, { message: requiredErrorMsg }),
  issue_date: z.date({
    required_error: "A date of birth is required.",
  }),
  payment: z.array(payment).min(2, { message: requiredErrorMsg })
});
