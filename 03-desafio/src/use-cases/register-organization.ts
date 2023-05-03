import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcrypt'

interface RegisterOrganizationUseCaseRequest {
  email: string
  password: string
  zipcode: string
  address: string
  contact: string
  name_accountable: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Org
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(
    props: RegisterOrganizationUseCaseRequest,
  ): Promise<RegisterOrganizationUseCaseResponse> {
    const hashedPassword = await hash(props.password, 6)

    const organization = await this.organizationsRepository.register({
      email: props.email,
      password_hash: hashedPassword,
      address: props.address,
      contact: props.contact,
      name_accountable: props.name_accountable,
      zipcode: props.zipcode,
    })

    return { organization }
  }
}
