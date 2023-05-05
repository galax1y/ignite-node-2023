import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),

    // Filter
    age: z.coerce.number().optional(),
    size: z.coerce.number().optional(),
    independence: z.coerce.number().min(1).max(3).optional(),
    energy: z.coerce.number().min(1).max(3).optional(),
  })

  try {
    const { city, age, energy, independence, size } =
      searchPetsParamsSchema.parse(request.query)

    const searchPetsUseCase = makeSearchPetsUseCase()

    const filter = {
      age,
      size,
      independence,
      energy,
    }

    const pets = await searchPetsUseCase.execute({ city, filter })

    reply.status(200).send(pets)
  } catch (err) {
    reply.send({ message: `This route needs a 'city' query parameter` })
  }
}
