// Fetch unique pet
import { makeFetchPetDetailsUseCase } from '@/use-cases/factories/make-fetch-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  try {
    const { petId } = fetchPetDetailsParamsSchema.parse(request.params)

    const fetchPetDetailsUseCase = makeFetchPetDetailsUseCase()

    const pet = await fetchPetDetailsUseCase.execute({ petId })

    if (!pet) {
      reply.status(404).send({ message: 'Pet not found' })
    }

    reply.status(200).send(pet)
  } catch (err) {
    reply.send({ message: `This route needs a 'petId' query parameter` })
  }
}
