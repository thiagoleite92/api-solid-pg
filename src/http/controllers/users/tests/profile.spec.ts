import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../../../../app/app'
import { createAndAuthenticateUser } from '../../../../utils/tests/create-and-authenticate-user'

describe('e2e -> Profile', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'john.doe@gmail.com',
      }),
    )
  })
})
