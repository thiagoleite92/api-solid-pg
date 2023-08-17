import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '../../../use-cases/factories/make-get-user-profile-use-case'

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()

  const profile = await getUserProfile.execute({
    userId: request.user.sub,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password_hash, ...user } = profile.user

  return reply.status(200).send({ user })
}
