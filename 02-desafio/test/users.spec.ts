import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('users route test suite', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

   it('it should be able to create a new user', async () => {
    const response = await request(app.server).post('/users')

    expect(response.statusCode).toEqual(201)
   })

  // it('should be able to log in', async () => {

  // })

  // it('should be able to return metrics for the current user', async () => {

  // })
})