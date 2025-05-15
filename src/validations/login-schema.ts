import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Mínimo de 6 caracteres'),
})

export type LoginSchemaData = z.infer<typeof loginSchema>
