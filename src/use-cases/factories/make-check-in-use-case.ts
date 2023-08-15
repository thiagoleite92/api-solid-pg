import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gym-repository'
import { CheckInUseCase } from '../checkIn'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}
