import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    age: z.number().positive(),
    energy: z.number().positive(),
    independence: z.number().positive(),
    size: z.number().positive(),
    organizationId: z.string().uuid(),
  })

  const { age, energy, independence, organizationId, size } =
    registerPetBodySchema.parse(request.body)

  const registerOrganizationUseCase = makeRegisterPetUseCase()

  const organization = await registerOrganizationUseCase.execute({
    age,
    energy,
    independence,
    size,
    organizationId,
  })

  reply.status(201).send(organization)
}
