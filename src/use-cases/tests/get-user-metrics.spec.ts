import { expect, it, describe, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from '../get-user-metrics'
import { InMemoryCheckInsRepository } from '../../repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Use case -> Get User Metrics', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get all check-ins by userId', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
      created_at: new Date(),
    })

    await checkInsRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1',
      created_at: new Date(),
    })

    await checkInsRepository.create({
      gym_id: 'gym-3',
      user_id: 'user-1',
      created_at: new Date(),
    })

    const { checkInsCount } = await sut.execute({ userId: 'user-1' })

    expect(checkInsCount).toEqual(3)
  })
})
