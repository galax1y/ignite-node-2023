import { FastifyInstance } from 'fastify'
import { register } from './register'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)

  app.get('/pets', search)
}
