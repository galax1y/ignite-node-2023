import { FastifyInstance } from 'fastify'
import { register } from './register'
import { search } from './search'
import { verifyAuth } from '@/http/middlewares/verify-auth'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)

  /* Rotas autenticadas */
  app.post('/pets', { onRequest: [verifyAuth] }, register)
}
