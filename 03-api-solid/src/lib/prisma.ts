import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // Se em desenvolvimento, log['query']
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
