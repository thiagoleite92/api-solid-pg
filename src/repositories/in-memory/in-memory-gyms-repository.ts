import { GymsRepository } from '../gym-repository'
import { Gym } from '@prisma/client'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Array<Gym> = []

  async findById(gymId: string) {
    const gym = await this.items.find((gym) => gym.id === gymId)

    return gym || null
  }
}
