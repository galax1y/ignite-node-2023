import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  /* Rotas para usuários ainda não autenticados */
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Rotas para usuários autenticados */
  // { onRequest: [verifyJWT] } é um middleware para autenticação, caso não esteja autenticado retornará 401 Unauthorized
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
