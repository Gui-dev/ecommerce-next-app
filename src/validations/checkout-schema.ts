import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  cardNumber: z
    .string()
    .min(16, 'Número deve ter no mínimo 16 dígitos')
    .max(19, 'Numero deve ter no máximo 19 dígitos'),
})

export type CheckoutSchemaData = z.infer<typeof checkoutSchema>
