import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions', // Todas as rotas dentro de transactionsRoutes vão ser baseURL/transactions/x
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
