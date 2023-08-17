import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../../app/app'
import { createAndAuthenticateUser } from '../../../../utils/tests/create-and-authenticate-user'

describe('e2e -> Gym -> Search', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms  by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '(81)983643305',
        latitude: -8.0448241,
        longitude: -34.9189968,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '(81)983643305',
        latitude: -8.0448241,
        longitude: -34.9189968,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'JavaScript' })
      .set('Authorization', 'Bearer ' + token)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
