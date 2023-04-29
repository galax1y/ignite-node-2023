import { FastifyInstance } from "fastify";
import { checkCookiesForUserId } from "../middlewares/check-cookies-for-user-id";
import { knex } from "../database";
import { z } from "zod";
import NewDateAsIso from "../utils/get-new-date-as-iso";

export async function mealsRoutes(app: FastifyInstance) {
  // Todas rotas nesse contexto devem passar por esse hook preHandler
  app.addHook('preHandler', checkCookiesForUserId)

  app.get('/', async (request, reply) => {

    const meals = await knex('meals').select('*').where({
      user_id: request.cookies.userId
    })

    reply.status(200).send(meals)
  })



  // Deve ser possível registrar uma refeição feita
  app.post('/', async (request, reply) => {

    const registerMealRequestBodySchema = z.object({
      meal_id: z.string().uuid(),
      name: z.string().min(3),
      description: z.string().optional(),
      is_healthy: z.boolean(),
    })

    try {
      const { name, meal_id, is_healthy, description } = registerMealRequestBodySchema.parse(request.body)

      const { userId } = request.cookies

      const meal = {
        meal_id,
        name,
        description,
        is_healthy,
        created_at: NewDateAsIso(),
        user_id: userId
      }

      await knex('meals').insert(meal)

      reply.status(201).send()
    }
    catch (error) {
      reply.status(400).send(error)
    }
  })
}