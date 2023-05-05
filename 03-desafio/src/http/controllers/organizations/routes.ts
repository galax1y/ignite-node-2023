import { FastifyInstance } from 'fastify'
import { register } from './register'
import { login } from './login'
import { contact } from './contact'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/organizations/login', login)

  app.get('/organizations/adopt/:petId', contact)
}
