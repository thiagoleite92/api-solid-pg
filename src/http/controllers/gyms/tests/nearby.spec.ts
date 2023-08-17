import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../../app/app'
import { createAndAuthenticateUser } from '../../../../utils/tests/create-and-authenticate-user'

describe('e2e -> Gym -> Nearby', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Near Gym',
        description: null,
        phone: null,
        latitude: -8.0448241,
        longitude: -34.9189968,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Far Gym',
        description: null,
        phone: null,
        latitude: -8.0448241,
        longitude: -34.3089968,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -8.048116, longitude: -34.920402 })
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
