// ContactForAdoptionUseCase

import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface ContactForAdoptionUseCaseRequest {
  petId: string
}

interface ContactForAdoptionUseCaseResponse {
  pet: Pet
  city: string
  contact: string
  address: string
  zipcode: string
  name_accountable: string
}

export class ContactForAdoptionUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute(
    props: ContactForAdoptionUseCaseRequest,
  ): Promise<ContactForAdoptionUseCaseResponse> {
    const pet = await this.petsRepository.findById(props.petId)

    if (!pet) {
      throw new Error('Pet not found')
    }

    const organization = await this.organizationsRepository.findById(pet.orgId)

    if (!organization) {
      throw new Error('Organization not found')
    }

    return {
      pet,
      address: organization.address,
      city: organization.city,
      contact: organization.contact,
      zipcode: organization.zipcode,
      name_accountable: organization.name_accountable,
    }
  }
}
