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
  payment_method: z.string({ message: requiredErrorMsg }).min(1),
  mountain: z.coerce.number().min(1, { message: requiredErrorMsg }),
  reference : z.string().min(1, { message : requiredErrorMsg })
})

export const NoteScheme = z.object({
  client_id: z.number( {message: requiredErrorMsg }).min(1),
  issue_date: z.string({
    required_error: "Se requiere una fecha",
  }).date(),
  total_price: z.number().min(1, { message: requiredErrorMsg }),
  payment: z.array(payment).min(1, { message: requiredErrorMsg })
});