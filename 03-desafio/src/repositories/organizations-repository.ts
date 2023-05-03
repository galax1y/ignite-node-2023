import { Org, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  register(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findManyByCity(city: string): Promise<Org[]>
}
