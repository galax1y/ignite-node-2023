import { Pet } from '@prisma/client'

export interface PetsRepository {
  register(): Promise<Pet>
}
