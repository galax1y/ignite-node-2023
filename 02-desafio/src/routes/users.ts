import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";

import { checkCookiesForUserId } from "../middlewares/check-cookies-for-user-id";
import addUserIdToCookies from "../utils/add-user-id-to-cookies";
import { randomUUID } from "node:crypto";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    console.log('Rota POST (users) foi acionada')

    const userId = randomUUID()

    const user = {
      user_id: userId,
    }

    await knex('users')
    .insert(user)
    
    await addUserIdToCookies(userId, reply)
    
    reply.status(201).send({user})
  })

  app.get('/metrics', {preHandler: [checkCookiesForUserId]}, async (request, reply) => {
    console.log('Rota GET (users/metrics) foi acionada')
    const userMeals = await knex('meals')
    .select('*')
    .where({
      user_id: request.cookies.userId
    })

    const metrics = {
      totalMeals: userMeals.length,
      onDietMeals: userMeals.filter((meal) => meal.is_healthy).length,
      offDietMeals: userMeals.filter((meal) => !meal.is_healthy).length
    }

    reply.status(200).send(metrics)
  })

  app.post('/login', async (request, reply) => {
    console.log('Rota POST (users/login) foi acionada')
    const loginRequestBodySchema = z.object({
      user_id: z.string().uuid()
    })

    try {
      const { user_id: userId } = loginRequestBodySchema.parse(request.body)

      if (!userId) {
        reply.status(400).send({message: 'User id was not provided'})
      }

      const userFound = await knex('users')
      .first()
      .where({
        user_id: userId,
      })

      if (!userFound) {
        reply.status(404).send({message: 'User not found'})
      }

      await addUserIdToCookies(userId, reply)

      reply.status(200).send({message: 'Log in successful'})

    } catch (error) {
      reply.status(400).send({message: error})
    }
  })
}