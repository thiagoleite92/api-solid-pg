import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from '../fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Use case -> Fetch Near By Gyms', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)

    // await gymsRepository.create({
    //   description: '',
    //   title: 'Academia JavaScript',
    //   latitude: -8.048116,
    //   longitude: -34.920402,
    //   id: 'gym-id',
    //   phone: '',
    // })
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -8.0448241,
      longitude: -34.9189968,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -8.0448241,
      longitude: -34.3089968,
    })

    const { gyms } = await sut.execute({
      userLatitude: -8.048116,
      userLongitude: -34.920402,
    })

    expect(gyms).toBeDefined()
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
