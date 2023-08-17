import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../../app/app'
import { createAndAuthenticateUser } from '../../../../utils/tests/create-and-authenticate-user'
import { prisma } from '../../../../lib/prisma'

describe('e2e -> Check In -> Create', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '(81)983643305',
        latitude: -8.0448241,
        longitude: -34.9189968,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        latitude: -8.0448241,
        longitude: -34.9189968,
      })

    expect(response.statusCode).toEqual(201)
  })
})
