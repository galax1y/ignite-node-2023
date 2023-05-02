import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'

interface RegisterOrganizationUseCaseRequest {
  email: string
  password: string
  cep: string
  address: string
  whatsapp: string
  accountable: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    accountable,
    address,
    cep,
    email,
    password,
    whatsapp,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.register({
      accountable,
      address,
      cep,
      email,
      password_hash: password,
      whatsapp,
    })

    return { organization }
  }
}
