import { FastifyInstance } from 'fastify'
import { authenticate, register } from './controllers'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Auth Routes */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
