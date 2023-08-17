import { FastifyInstance } from 'fastify'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Auth Routes */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
