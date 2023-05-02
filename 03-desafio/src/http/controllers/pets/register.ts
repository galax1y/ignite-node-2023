import { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  reply.status(418).send({ message: 'Rota pets acessada' })
}
