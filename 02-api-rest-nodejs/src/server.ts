import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const fetchTransactions = await knex('transactions')
    .where('amount', 1337)
    .select('title')

  return fetchTransactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
