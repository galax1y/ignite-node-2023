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

  async findManyByCity(city: string): Promise<Org[]> {
    const organizationsInGivenCity = this.organizations.filter(
      (organization) => organization.city === city,
    )

    return organizationsInGivenCity
  }

  async findByEmail(email: string): Promise<Org | null> {
    const organization = this.organizations.find(
      (organization) => organization.email === email,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(orgId: string): Promise<Org | null> {
    const organization = this.organizations.find(
      (organization) => organization.id === orgId,
    )

    if (!organization) {
      return null
    }

    return organization
  }
}
