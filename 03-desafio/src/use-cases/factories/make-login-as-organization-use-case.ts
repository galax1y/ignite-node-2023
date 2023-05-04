import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { LoginAsOrganizationUseCase } from '../login-as-organization'

export function makeLoginAsOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const loginAsOrganizationUseCase = new LoginAsOrganizationUseCase(
    organizationsRepository,
  )

  return loginAsOrganizationUseCase
}
