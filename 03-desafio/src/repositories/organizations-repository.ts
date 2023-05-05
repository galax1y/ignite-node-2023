import { Org, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  register(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findManyByCity(city: string): Promise<Org[]>
  findByEmail(email: string): Promise<Org | null>
  findById(orgId: string): Promise<Org | null>
}
