import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  /* Rotas para usuários ainda não autenticados */
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Rotas para usuários autenticados */
  app.get('/me', profile)
}
