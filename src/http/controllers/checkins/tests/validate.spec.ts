import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../../app/app'
import { createAndAuthenticateUser } from '../../../../utils/tests/create-and-authenticate-user'
import { prisma } from '../../../../lib/prisma'

describe('e2e -> Check In -> Validate', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '(81)983643305',
        latitude: -8.0448241,
        longitude: -34.9189968,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})