import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { FilterProps, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  filter: FilterProps
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
    filter,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const organizationsInCity =
      await this.organizationsRepository.findManyByCity(city)

    console.log('filter:', filter)

    const pets = await Promise.all(
      organizationsInCity.map(
        async (organization) =>
          await this.petsRepository.find(organization.id, filter),
      ),
    ).then((data) => data.flat())

    return { pets }
  }
}
