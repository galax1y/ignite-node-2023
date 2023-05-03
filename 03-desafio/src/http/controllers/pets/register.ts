import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    orgId: z.string().uuid(),
    size: z.number().positive().min(1).max(3),
    age: z.number().positive(),
    energy: z.number().positive().min(1).max(5),
    independence: z.number().positive().min(1).max(3),
  })

  try {
    const { age, energy, size, orgId, independence } =
      registerPetBodySchema.parse(request.body)

    const registerOrganizationUseCase = makeRegisterPetUseCase()

    const organization = await registerOrganizationUseCase.execute({
      orgId,
      age,
      size,
      energy,
      independence,
    })

    reply.status(201).send(organization)
  } catch (err) {
    reply.status(418).send({ message: err })
  }
}
