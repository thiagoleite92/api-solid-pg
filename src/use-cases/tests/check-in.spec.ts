import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '../checkIn'
import { InMemoryCheckInsRepository } from '../../repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-off-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Use case -> Check In', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      description: '',
      title: 'Academia JavaScript',
      latitude: -8.048116,
      longitude: -34.920402,
      id: 'gym-id',
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -8.048116,
      userLongitude: -34.920402,
    })

    expect(checkIn).toBeDefined()
  })

  it('should not be able to check in twice in a day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -8.048116,
      userLongitude: -34.920402,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -8.048116,
        userLongitude: -34.920402,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check-in in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -8.048116,
      userLongitude: -34.920402,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -8.048116,
      userLongitude: -34.920402,
    })

    expect(checkIn).toBeDefined()
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      description: '',
      title: 'Academia JavaScript',
      latitude: new Decimal(-8.0448241),
      longitude: new Decimal(-34.9189968),
      id: 'gym-id-02',
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-02',
        userId: 'user-id',
        userLatitude: -8.048116,
        userLongitude: -34.920402,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
