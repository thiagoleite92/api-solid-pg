import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '../search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Use case -> Fetch User Check Ins History', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)

    // await gymsRepository.create({
    //   description: '',
    //   title: 'Academia JavaScript',
    //   latitude: -8.048116,
    //   longitude: -34.920402,
    //   id: 'gym-id',
    //   phone: '',
    // })
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -8.0448241,
      longitude: -34.9189968,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -8.0448241,
      longitude: -34.9189968,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toBeDefined()
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -8.0448241,
        longitude: -34.9189968,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toBeDefined()
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
