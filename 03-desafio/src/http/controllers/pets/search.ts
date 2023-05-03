import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),
  })

  try {
    const { city } = searchPetsParamsSchema.parse(request.query)

    const searchPetsUseCase = makeSearchPetsUseCase()

    const pets = await searchPetsUseCase.execute({ city })

    reply.status(200).send(pets)
  } catch (err) {
    reply.send({ message: `This route needs a 'city' query parameter` })
  }
}
