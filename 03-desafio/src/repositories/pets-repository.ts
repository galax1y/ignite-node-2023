import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByOrg(orgId: string): Promise<Pet[]>
  findById(petId: string): Promise<Pet | null>
}
