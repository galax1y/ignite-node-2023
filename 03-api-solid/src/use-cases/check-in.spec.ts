import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

// SUT -> System Under Test, uma nomenclatura padrão adotada pela comunidade
let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'gym-01',
      title: 'Test Gym',
      description: '',
      latitude: new Decimal(-29.992484),
      longitude: new Decimal(-51.100282),
      phone: '123123123123',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.992484,
      userLongitude: -51.100282,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.992484,
      userLongitude: -51.100282,
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -29.992484,
        userLongitude: -51.100282,
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.992484,
      userLongitude: -51.100282,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.992484,
      userLongitude: -51.100282,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in from further than x meters from the gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      title: 'Distant gym',
      description: '',
      // About 500m from the point created in beforeEach()
      latitude: new Decimal(-29.992333),
      longitude: new Decimal(-51.095371),
      phone: '99877776666',
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -29.992484,
        userLongitude: -51.100282,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
