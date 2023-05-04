import { FastifyInstance } from 'fastify'
import { register } from './register'
import { login } from './login'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/organizations/login', login)
}
