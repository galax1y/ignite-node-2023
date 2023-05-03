import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const registerPetsUseCase = new SearchPetsUseCase(
    organizationsRepository,
    petsRepository,
  )

  return registerPetsUseCase
}
