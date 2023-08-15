import { Decimal } from '@prisma/client/runtime/library'
import { FindManyNearByParams, GymsRepository } from '../gym-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '../../utils/get-distance-between-two-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Array<Gym> = []

  async findById(gymId: string) {
    const gym = await this.items.find((gym) => gym.id === gymId)

    return gym || null
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearBy(params: FindManyNearByParams) {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10 // 10 kilometers
    })
  }
}
