import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const organizationsInCity =
      await this.organizationsRepository.findManyByCity(city)

    const pets = await Promise.all(
      organizationsInCity.map(
        async (organization) =>
          await this.petsRepository.findManyByOrg(organization.id),
      ),
    ).then((data) => data.flat())

    return { pets }
  }
}
