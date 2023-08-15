import fastify from 'fastify'
import { appRoutes } from '../http/routes'
import { ZodError } from 'zod'
import { env } from '../env'
import fastifyJwt from '@fastify/jwt'
import { UnauthorizedError } from '../http/errors/unauthorized-error'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message })
  }

  console.log(error)

  return reply.status(500).send({ message: 'Internal Server Error' })
})
