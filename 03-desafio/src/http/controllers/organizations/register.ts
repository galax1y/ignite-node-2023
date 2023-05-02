import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    cep: z.string().length(8),
    address: z.string(),
    whatsapp: z.string().min(8).max(9),
    accountable: z.string(),
  })

  const { accountable, address, cep, email, password, whatsapp } =
    registerOrganizationBodySchema.parse(request.body)

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

  const organization = await registerOrganizationUseCase.execute({
    accountable,
    address,
    cep,
    email,
    password,
    whatsapp,
  })

  reply.status(201).send(organization)
}
