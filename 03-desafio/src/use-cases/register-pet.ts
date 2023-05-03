import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  orgId: string
  age: number
  size: number
  energy: number
  independence: number
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    props: RegisterPetUseCaseRequest,
  ): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.register({
      orgId: props.orgId,
      age: props.age,
      size: props.size,
      energy: props.energy,
      independence: props.independence,
    })

    return { pet }
  }
}
