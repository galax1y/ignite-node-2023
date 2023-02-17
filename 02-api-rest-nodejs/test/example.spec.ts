import { expect, test, beforeAll, afterAll } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

// test('enunciado', () => {
//  operação
//  validação - expect()
// })

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('user should be able to create a new transaction', async () => {
  const response = await request(app.server).post('/transactions').send({
    title: 'New transaction',
    amount: 5000,
    type: 'credit',
  })

  expect(response.statusCode).toEqual(201)
})
