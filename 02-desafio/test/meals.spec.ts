import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

describe('meals route test suite', () => {
  
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new meal', async () => {
    const createUserResponse = await request(app.server).post('/users')

    const cookies = createUserResponse.get('Set-Cookie')

    const uuid = randomUUID()

    const response = await request(app.server)
    .post('/meals')
    .set('Cookie', cookies)
    .send({
      meal_id: uuid,
      name: "Unit test meal",
      description: "Unit test description",
      is_healthy: true,
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all meals from the current user', async () => {
    const createUserResponse = await request(app.server).post('/users')

    const cookies = createUserResponse.get('Set-Cookie')

    const uuid = randomUUID()

    // Create mock meal
    await request(app.server)
    .post('/meals')
    .set('Cookie', cookies)
    .send({
      meal_id: uuid,
      name: "Unit test meal",
      description: "Unit test description",
      is_healthy: true,
    })

    const response = await request(app.server)
    .get('/meals')
    .set('Cookie', cookies)

    expect(response.body)
    .toEqual(expect.arrayContaining([
      {
        meal_id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        created_at: expect.any(String),
        is_healthy: expect.any(Number),
        user_id: expect.any(String),
      }
    ]))
  })

  // it('should be able to edit an existing meal', async () => {
    
  // })

  // it('should be able to update an existing meal', async () => {
    
  // })

  // it('should be able to delete an existing meal', async () => {
    
  // })
})