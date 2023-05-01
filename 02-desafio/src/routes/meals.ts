import { FastifyInstance } from "fastify";
import { checkCookiesForUserId } from "../middlewares/check-cookies-for-user-id";
import { knex } from "../database";
import { z } from "zod";
import NewDateAsIso from "../utils/get-new-date-as-iso";

const updateMealRequestParamsSchema = z.object({
  mealId: z.string().uuid()
})

export async function mealsRoutes(app: FastifyInstance) {
  // Todas rotas nesse contexto devem passar por esse hook preHandler
  app.addHook('preHandler', checkCookiesForUserId)

  app.get('/', async (request, reply) => {

    const meals = await knex('meals').select('*').where({
      user_id: request.cookies.userId
    })

    reply.status(200).send(meals)
  })

  app.delete('/:mealId', async (request, reply) => {
    console.log('Rota DELETE foi acionada')

    const deleteMealRequestParamsSchema = z.object({
      mealId: z.string().uuid()
    })

    try {
      const { mealId } = deleteMealRequestParamsSchema.parse(request.params)

      await knex('meals').delete('*').where({
        meal_id: mealId,
        user_id: request.cookies.userId
      })

      reply.status(200).send()
    } catch (error) {
      reply.status(400).send({message: error})
    }
  })

  // Deve ser possível editar uma refeição
  app.patch('/:mealId', async (request, reply) => {
    console.log('Rota UPDATE foi acionada')

    const updateMealRequestBodySchema = z.object({
      name: z.string().min(3),
      description: z.string().optional(),
      is_healthy: z.boolean(),
    })

    try {
      const { mealId } = updateMealRequestParamsSchema.parse(request.params)
      // Validar se essa refeição existe

      const data = updateMealRequestBodySchema.parse(request.body)
    
      await knex('meals').update({
        ...data
      }).where({
        meal_id: mealId,
        user_id: request.cookies.userId
      })

      reply.status(200).send()
    } catch (error) {
      reply.status(400).send({message: error})
    }
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
      reply.status(400).send({message: error})
    }
  })

  app.get('/:mealId', async (request, reply) => {
    try {
      const { mealId } = updateMealRequestParamsSchema.parse(request.params)

      const meal = await knex('meals').select('*').where({
        meal_id: mealId
      })
      
      reply.status(200).send(meal)
    } catch (error) {
      reply.status(400).send({message: error})
    }
  })
}