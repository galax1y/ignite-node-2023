import { OrganizationsRepository } from '../organizations-repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Org[] = []

  async register(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const organization: Org = {
      id: randomUUID(),
      email: 'test@example.com',
      password_hash: 'password',
      address: 'Street 24',
      zipcode: '99888777',
      contact: '977771111',
      name_accountable: 'John Doe',
    }

    this.organizations.push(organization)

    return organization
  }
}
