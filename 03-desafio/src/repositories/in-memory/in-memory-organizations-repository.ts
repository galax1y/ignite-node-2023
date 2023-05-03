import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async register(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      accountable: data.accountable,
      whatsapp: data.whatsapp,
      address: data.address,
      cep: data.cep,
    }

    this.organizations.push(organization)

    return organization
  }
}
