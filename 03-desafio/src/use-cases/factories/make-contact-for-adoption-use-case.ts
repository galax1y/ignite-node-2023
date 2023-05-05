import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ContactForAdoptionUseCase } from '../contact-for-adoption'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeContactForAdoptionUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const contactForAdoptionUseCase = new ContactForAdoptionUseCase(
    petsRepository,
    organizationsRepository,
  )

  return contactForAdoptionUseCase
}
