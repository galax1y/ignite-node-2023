import { OrganizationsRepository } from '../organizations-repository'
import { Org, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async register(data: Prisma.OrgUncheckedCreateInput) {
    const organization = await prisma.org.create({ data })

    return organization
  }

  async findManyByCity(city: string): Promise<Org[]> {
    const organizations = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return organizations
  }
}
