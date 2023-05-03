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
      ...data,
    }

    this.organizations.push(organization)

    return organization
  }
}
