import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    zipcode: z.string().length(8),
    address: z.string(),
    contact: z.string().length(9),
    name_accountable: z.string(),
    city: z.string(),
  })

  try {
    const {
      email,
      password,
      zipcode,
      address,
      contact,
      name_accountable,
      city,
    } = registerOrganizationBodySchema.parse(request.body)

    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    const organization = await registerOrganizationUseCase.execute({
      email,
      password,
      zipcode,
      address,
      contact,
      name_accountable,
      city,
    })

    reply.status(201).send(organization)
  } catch (err) {
    reply.status(418).send({ message: err })
  }
}
