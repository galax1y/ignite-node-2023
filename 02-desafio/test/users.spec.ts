import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

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

  it('should be able to return metrics for the current user', async () => {
    const mockUser = await request(app.server).post('/users')

    const cookies = mockUser.get('Set-Cookie')

    // Create mock meal
    await request(app.server)
    .post('/meals')
    .set('Cookie', cookies)
    .send({
      meal_id: randomUUID(),
      name: "Unit test meal",
      description: "Unit test description",
      is_healthy: true,
    })

    const response = await request(app.server)
    .get('/users/metrics')
    .set('Cookie', cookies)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual(expect.objectContaining({
      totalMeals: expect.any(Number),
      onDietMeals: expect.any(Number),
      offDietMeals: expect.any(Number),
    }))

    const { totalMeals, onDietMeals, offDietMeals } = response.body

    expect(totalMeals).toEqual(1)
    expect(onDietMeals).toEqual(1)
    expect(offDietMeals).toEqual(0)

    expect(totalMeals).toEqual(onDietMeals + offDietMeals)
  })

  it('should be able to log in', async () => {
    const mockUser = await request(app.server).post('/users')

    const cookies = mockUser.get('Set-Cookie')
    
    // Parse cookies from 'Set-Cookie' header
    const cookie: any = cookies[0].split(';')
    .map(item => item.split('='))
    .reduce((acc: any, [k, v]) => (acc[k.trim().replace('"', '')] = v)
    && acc, {});

    const { userId } = cookie

    const response = await request(app.server)
    .post('/users/login')
    .send({
      user_id: userId,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining({
      message: 'Log in successful'
    })
  )})
})