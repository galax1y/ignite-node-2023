import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const userId = request.user.sub

  const { checkInsCount } = await getUserMetricsUseCase.execute({ userId })

  return reply.status(200).send({
    checkInsCount,
  })
}
