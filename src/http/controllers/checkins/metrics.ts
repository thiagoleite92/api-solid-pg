import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '../../../use-cases/factories/make-get-user-metrics-use-case'

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub } = request.user

  const getMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getMetricsUseCase.execute({
    userId: sub,
  })
  return reply.status(200).send({ checkInsCount })
}
