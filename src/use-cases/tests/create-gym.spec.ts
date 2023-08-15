import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

let gymsReposotiry: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Use case -> Create Gym', () => {
  beforeEach(() => {
    gymsReposotiry = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsReposotiry)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -8.0448241,
      longitude: -34.9189968,
    })

    expect(gym).toBeDefined()
  })
})
