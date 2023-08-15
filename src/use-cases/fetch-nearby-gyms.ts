import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gym-repository'

interface FetchNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsUseCaseResponse {
  gyms: Array<Gym>
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
