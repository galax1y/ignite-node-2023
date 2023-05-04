import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcrypt'

interface LoginAsOrganizationUseCaseRequest {
  email: string
  password: string
}

interface LoginAsOrganizationUseCaseResponse {
  organization: Org
}

export class LoginAsOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(
    props: LoginAsOrganizationUseCaseRequest,
  ): Promise<LoginAsOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(
      props.email,
    )

    if (!organization) {
      throw new Error('Organization not found')
    }

    const doesPasswordMatch = await compare(
      props.password,
      organization.password_hash,
    )

    if (!doesPasswordMatch) {
      throw new Error('Invalid credentials')
    }

    // Add other authentication processes down here

    return { organization }
  }
}
