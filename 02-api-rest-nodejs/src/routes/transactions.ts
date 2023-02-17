import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  const fetchTransactions = await knex('transactions')
    .where('amount', 1337)
    .select('title')

  return fetchTransactions
}
