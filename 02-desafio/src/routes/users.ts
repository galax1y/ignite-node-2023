import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    console.log('Rota foi acionada')
    reply.send({message: 'Retorno da rota'})
  })
}