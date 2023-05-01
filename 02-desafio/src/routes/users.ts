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

  app.get('/metrics', async (request, reply) => {
    const userMeals = await knex('meals').where({
      user_id: request.cookies.userId
    })

    const metrics = {
      totalMeals: userMeals.length,
      onDietMeals: userMeals.filter((meal) => meal.is_healthy).length,
      offDietMeals: userMeals.filter((meal) => !meal.is_healthy).length
    }

    reply.status(200).send(metrics)
  })
}