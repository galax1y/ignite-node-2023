// TDD EM MENTE

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ContactForAdoptionUseCase } from './contact-for-adoption'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

describe('Contact for Adoption Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: ContactForAdoptionUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new ContactForAdoptionUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to get information to start the adoption process', async () => {
    const mockOrganization = await organizationsRepository.register({
      email: 'test@example.com',
      password_hash: 'test',
      name_accountable: 'Test accountable',
      contact: '988887777',
      address: 'Rua Teste, 23',
      zipcode: '99888777',
      city: 'Test City',
    })

    const mockPet = await petsRepository.register({
      orgId: mockOrganization.id,
      age: 1,
      energy: 1,
      independence: 1,
      size: 1,
    })

    const response = await sut.execute({
      petId: mockPet.id,
    })

    expect(response.pet.id).toEqual(mockPet.id)
  })
})
