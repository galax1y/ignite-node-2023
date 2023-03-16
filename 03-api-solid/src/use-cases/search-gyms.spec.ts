import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

// SUT -> System Under Test, uma nomenclatura padrão adotada pela comunidade
let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search a gym', async () => {
    await gymsRepository.create({
      title: 'Test Galaxy Gym',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Not Supposed to Find This Gym',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({ query: 'Galaxy', page: 1 })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Test Galaxy Gym ${i}`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({ query: 'Galaxy', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Test Galaxy Gym 21' }),
      expect.objectContaining({ title: 'Test Galaxy Gym 22' }),
    ])
  })
})
