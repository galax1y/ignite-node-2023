import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),
  })

  try {
    const { city } = searchPetsParamsSchema.parse(request.query)

    console.log(city)

    reply.status(200).send({ message: 'Not implemented yet' })
  } catch (err) {
    reply.send({ message: `This route needs a 'city' query parameter` })
  }
}
