import { FastifyInstance } from 'fastify'
import { register } from './register'
import { search } from './search'
import { fetch } from './fetch'
import { verifyAuth } from '@/http/middlewares/verify-auth'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
  app.get('/pets/:petId', fetch)

  /* Rotas autenticadas */
  app.post('/pets', { onRequest: [verifyAuth] }, register)
}
