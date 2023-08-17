import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymUseCase } from '../../../use-cases/factories/make-create-gym-use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { title, latitude, longitude, phone, description } =
    createBodySchema.parse(request.body)

  const createGymUsecase = makeCreateGymUseCase()

  await createGymUsecase.execute({
    title,
    latitude,
    longitude,
    phone,
    description,
  })
  return reply.status(201).send()
}
