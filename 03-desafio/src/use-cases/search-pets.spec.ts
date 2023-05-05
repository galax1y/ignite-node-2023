// TDD EM MENTE

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

describe('Search Pets Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(organizationsRepository, petsRepository)
  })

  it('should be able to search pets in a given city', async () => {
    const organization = await organizationsRepository.register({
      email: 'test@example.com',
      password_hash: 'test-password',
      city: 'São Paulo',
      zipcode: '99888777',
      address: 'Sesame Street, 777',
      contact: '944442222',
      name_accountable: 'John Doe',
    })

    await petsRepository.register({
      orgId: organization.id,
      age: 1,
      energy: 1,
      independence: 1,
      size: 1,
    })

    await petsRepository.register({
      orgId: organization.id,
      age: 1,
      energy: 1,
      independence: 1,
      size: 1,
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      filter: {},
    })

    expect(pets).toHaveLength(2)
    expect(pets[0].orgId).toEqual(organization.id)
  })

  it('should be able to search for pets in a given city and use filter options', async () => {
    const organization = await organizationsRepository.register({
      email: 'test@example.com',
      password_hash: 'test-password',
      city: 'São Paulo',
      zipcode: '99888777',
      address: 'Sesame Street, 777',
      contact: '944442222',
      name_accountable: 'John Doe',
    })

    await petsRepository.register({
      orgId: organization.id,
      age: 5,
      energy: 5,
      independence: 1,
      size: 1,
    })

    await petsRepository.register({
      orgId: organization.id,
      age: 1,
      energy: 1,
      independence: 1,
      size: 1,
    })

    const firstTest = await sut.execute({
      city: 'São Paulo',
      filter: {
        age: 5,
        energy: 5,
      },
    })

    const secondTest = await sut.execute({
      city: 'São Paulo',
      filter: {
        independence: 1,
      },
    })

    expect(firstTest.pets).toHaveLength(1)
    expect(secondTest.pets).toHaveLength(2)
  })
})
