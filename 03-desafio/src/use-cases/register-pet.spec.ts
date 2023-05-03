import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { randomUUID } from 'node:crypto'

describe('Register Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: RegisterPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      orgId: randomUUID(),
      age: 5,
      energy: 5,
      independence: 1,
      size: 4,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopted_at).toEqual(null)
  })
})
