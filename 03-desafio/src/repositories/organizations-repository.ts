import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  register(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
}
