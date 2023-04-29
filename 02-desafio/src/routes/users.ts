import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

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
}