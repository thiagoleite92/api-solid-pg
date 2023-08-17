import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsHistory } from '../../../use-cases/factories/make-fetch-user-check-ins-history-use-case'

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)
  const { sub } = request.user

  const FetchCheckInHistoryUseCase = makeFetchUserCheckInsHistory()

  const { checkIns } = await FetchCheckInHistoryUseCase.execute({
    userId: sub,
    page,
  })
  return reply.status(200).send({ checkIns })
}
