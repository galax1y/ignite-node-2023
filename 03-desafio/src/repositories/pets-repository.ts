import { Pet, Prisma } from '@prisma/client'

export interface FilterProps {
  age?: number
  size?: number
  independence?: number
  energy?: number
}

export interface PetsRepository {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByOrg(orgId: string): Promise<Pet[]>
  findById(petId: string): Promise<Pet | null>
  find(orgId: string, filter: FilterProps): Promise<Pet[]>
}
