import { FastifyInstance } from 'fastify'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Auth Routes */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
