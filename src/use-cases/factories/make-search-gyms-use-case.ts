import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gym-repository'
import { SearchGymsUseCase } from '../search-gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
