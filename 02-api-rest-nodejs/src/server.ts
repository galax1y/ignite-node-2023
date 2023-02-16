import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const fetchTransactions = await knex('transactions')
    .where('amount', 1337)
    .select('title')

  return fetchTransactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
