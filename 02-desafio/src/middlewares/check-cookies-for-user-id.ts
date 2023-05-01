import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkCookiesForUserId(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.cookies.userId

  if (!userId) {
    return reply.status(401).send({message: 'Unauthorized'})
  }
}