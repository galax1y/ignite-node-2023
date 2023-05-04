import { makeLoginAsOrganizationUseCase } from '@/use-cases/factories/make-login-as-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  })

  try {
    const { email, password } = loginRequestBodySchema.parse(request.body)

    const loginAsOrganizationUseCase = makeLoginAsOrganizationUseCase()

    const { organization } = await loginAsOrganizationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    reply.status(200).send({ token })
  } catch (err) {
    reply.status(400).send({ message: err })
  }
}
