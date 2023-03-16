import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

// SUT -> System Under Test, uma nomenclatura padrão adotada pela comunidade
let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search for nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Nearby Gym',
      latitude: -29.992333,
      longitude: -51.095371,
    })

    await gymsRepository.create({
      title: 'Far away gym',
      latitude: -29.481865,
      longitude: -50.990965,
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.992484,
      userLongitude: -51.100282,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })])
  })
})
