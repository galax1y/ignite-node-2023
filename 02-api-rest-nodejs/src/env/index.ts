import { config } from 'dotenv'
import { z } from 'zod'

// Separar ambiente de produção e ambiente de teste
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

// Entra no process.env procurar se DATABASE_URL existe e é uma string
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables')
  throw new Error('Invalid environment variables')
}

export const env = _env.data
