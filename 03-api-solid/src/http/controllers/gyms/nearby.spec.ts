import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'nearby-gym',
        description: 'example-description-01',
        phone: '99877776666',
        latitude: -29.992333,
        longitude: -51.095371,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'far-away-gym',
        description: 'example-description-02',
        phone: '66788889999',
        latitude: -29.481865,
        longitude: -50.990965,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -29.992333,
        longitude: -51.095371,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'nearby-gym',
      }),
    ])
  })
})
