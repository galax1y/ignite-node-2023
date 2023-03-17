import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  /* Rotas para usuários ainda não autenticados */
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Rotas para usuários autenticados */
  // { onRequest: [verifyJWT] } é um middleware para autenticação, caso não esteja autenticado retornará 401 Unauthorized
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
