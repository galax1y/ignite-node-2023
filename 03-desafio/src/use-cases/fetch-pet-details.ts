import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetDetailsUseCaseRequest {
  petId: string
}

interface FetchPetDetailsUseCaseResponse {
  pet: Pet | null
}

export class FetchPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    props: FetchPetDetailsUseCaseRequest,
  ): Promise<FetchPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(props.petId)

    return { pet }
  }
}
