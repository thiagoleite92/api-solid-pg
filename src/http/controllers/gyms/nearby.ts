import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '../../../use-cases/factories/make-fetch-nearby-gyms-use-case'

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const nearbyFetchGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyFetchGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(200).send({ gyms })
}
