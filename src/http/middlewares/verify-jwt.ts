import { FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const verifyJWT = async (request: FastifyRequest) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    throw new UnauthorizedError()
  }
}
