import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../../app/app'
import { createAndAuthenticateUser } from '../../../../utils/tests/create-and-authenticate-user'

describe('e2e -> Gym -> Create', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '(81)983643305',
        latitude: -8.0448241,
        longitude: -34.9189968,
      })

    expect(response.statusCode).toEqual(201)
  })
})
