import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  age: number
  energy: number
  independence: number
  size: number

  organizationId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy,
    independence,
    size,
    organizationId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.register({
      age,
      energy,
      independence,
      organizationId,
      size,
    })

    return { pet }
  }
}
