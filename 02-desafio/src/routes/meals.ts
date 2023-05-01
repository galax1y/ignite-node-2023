import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { checkCookiesForUserId } from "../middlewares/check-cookies-for-user-id";
import NewDateAsIso from "../utils/get-new-date-as-iso";
import { z } from "zod";

const updateMealRequestParamsSchema = z.object({
  mealId: z.string().uuid()
})

export async function mealsRoutes(app: FastifyInstance) {
  // Todas rotas nesse contexto devem passar por esse hook preHandler
  app.addHook('preHandler', checkCookiesForUserId)

  app.get('/', async (request, reply) => {
    // console.log('Rota GET (meals) foi acionada')

    const meals = await knex('meals')
    .select('*')
    .where({
      user_id: request.cookies.userId
    })

    reply.status(200).send(meals)
  })

  app.delete('/:mealId', async (request, reply) => {
    // console.log('Rota DELETE (meals/:mealId) foi acionada')

    const deleteMealRequestParamsSchema = z.object({
      mealId: z.string().uuid()
    })

    try {
      const { mealId } = deleteMealRequestParamsSchema.parse(request.params)

      const deleted = await knex('meals')
      .delete()
      .where({
        meal_id: mealId,
        user_id: request.cookies.userId
      })

      if (!deleted) {
        reply.status(404).send({message: 'Not found'})
      }

      reply.status(200).send({didDelete: deleted})
    } catch (error) {
      reply.status(400).send({message: error})
    }
  })

  // Deve ser possível editar uma refeição
  app.patch('/:mealId', async (request, reply) => {
    // console.log('Rota UPDATE (meals/:mealId) foi acionada')

    const updateMealRequestBodySchema = z.object({
      name: z.string().min(3).optional(),
      description: z.string().optional(),
      is_healthy: z.boolean().optional(),
    })

    try {
      const { mealId } = updateMealRequestParamsSchema.parse(request.params)
      
      if (!mealId) {
        throw new Error('Meal not found in params')
      }

      const mealFound = await knex('meals')
      .first()
      .where({
        meal_id: mealId,
        user_id: request.cookies.userId,
      })

      if (!mealFound) {
        throw new Error('Meal not found')
      }
      
      const data = updateMealRequestBodySchema.parse(request.body)
      
      const updatedMeal = {
        ...mealFound,
        ...data,
      }
      
    
      await knex('meals')
      .update(updatedMeal)
      .where({
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
    // console.log('Rota POST (meals) foi acionada')

    const registerMealRequestBodySchema = z.object({
      meal_id: z.string().uuid(),
      name: z.string().min(3),
      description: z.string().optional(),
      is_healthy: z.boolean(),
    })

    try {
      const { name, meal_id, is_healthy, description } = registerMealRequestBodySchema.parse(request.body)

      const meal = {
        meal_id,
        name,
        description,
        is_healthy,
        created_at: NewDateAsIso(),
        user_id: request.cookies.userId
      }

      await knex('meals')
      .insert(meal)

      reply.status(201).send()
    }
    catch (error) {
      reply.status(400).send({message: error})
    }
  })

  app.get('/:mealId', async (request, reply) => {
    // console.log('Rota GET (meals/:mealId) foi acionada')
    try {
      const { mealId } = updateMealRequestParamsSchema.parse(request.params)

      const mealFound = await knex('meals')
      .first()
      .where({
        meal_id: mealId,
        user_id: request.cookies.userId,
      })

      if (!mealFound) {
        throw new Error('Meal not found')
      }
      
      reply.status(200).send(mealFound)
    } catch (error) {
      reply.status(400).send({message: error})
    }
  })
}