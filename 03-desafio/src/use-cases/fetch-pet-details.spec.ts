// TDD EM MENTE

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetDetailsUseCase } from './fetch-pet-details'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

describe('Login as Organization Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: FetchPetDetailsUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchPetDetailsUseCase(petsRepository)
  })

  it('should be able to fetch pet details', async () => {
    const mockOrganization = await organizationsRepository.register({
      address: 'Test address',
      city: 'Test city',
      contact: '988887777',
      email: 'test@example.com',
      name_accountable: 'John Doe',
      password_hash: 'testpassword',
      zipcode: '99888777',
    })

    const mockPet = await petsRepository.register({
      orgId: mockOrganization.id,
      age: 1,
      energy: 1,
      independence: 1,
      size: 1,
    })

    const { pet } = await sut.execute({ petId: mockPet.id })

    expect(pet?.id).toEqual(mockPet.id)
  })
})
