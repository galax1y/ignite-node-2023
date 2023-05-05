import { makeContactForAdoptionUseCase } from '@/use-cases/factories/make-contact-for-adoption-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function contact(request: FastifyRequest, reply: FastifyReply) {
  const contactParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  try {
    const { petId } = contactParamsSchema.parse(request.params)

    const contactForAdoptionUseCase = makeContactForAdoptionUseCase()

    const information = await contactForAdoptionUseCase.execute({
      petId,
    })

    reply.status(200).send({ information })
  } catch (err) {
    reply.status(418).send({ message: err })
  }
}
