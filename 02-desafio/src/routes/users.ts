import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { } from '@fastify/cookie'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    console.log('Rota POST user foi acionada')

    const userId = randomUUID()

    const user = {
      user_id: userId,
    }

    await knex('users').insert(user)

    reply.cookie('userId', userId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24, // unit: ms - total: 24h
    })
    
    reply.status(201).send({user})
  })

  app.post('/meals', async (request, reply) => {
    console.log('Rota adicionar refeição ativada')

    const { userId } = request.cookies

    if (!userId) {
      reply.status(401).send({message: 'Não autorizado'})
    }

    await knex('meals').insert({
      name: 'test',
      description: 'test description',
      created_at: (new Date()).toISOString(),
      is_healthy: true,
      meal_id: randomUUID(),
      user_id: userId
    })
  })

  app.get('/meals', async (request, reply) => {
    const { userId } = request.cookies

    if (!userId) {
      reply.status(401).send({message: 'Não autorizado'})
    }

    const meals = await knex('meals').select('*').where({
      user_id: userId
    })

    reply.status(200).send(meals)
  })
}