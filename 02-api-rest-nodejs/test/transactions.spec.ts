import { expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'child_process'

// test('enunciado', () => {
//  operação
//  validação - expect()
// })

describe('/transactions route tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // Antes de cada teste, teremos um banco de dados de teste LIMPO, garantindo que o teste seja feito em um ambiente controlado.
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('user should be able to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  test('it should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(listTransactionsResponse.statusCode).toEqual(200)
    console.log(listTransactionsResponse.body.transactions)
    expect(listTransactionsResponse.body.transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New transaction',
          amount: 5000,
        }),
      ]),
    )
  })

  test('it should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
    expect(listTransactionsResponse.statusCode).toEqual(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionFromId = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(getTransactionFromId.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  test('it should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const transactionsSummary = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)

    expect(transactionsSummary.statusCode).toEqual(200)

    expect(transactionsSummary.body).toEqual(
      expect.objectContaining({
        summary: expect.objectContaining({
          amount: expect.any(Number),
        }),
      }),
    )
  })
})
