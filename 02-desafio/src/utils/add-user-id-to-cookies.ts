import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export default async function addUserIdToCookies(id: string, reply: FastifyReply) {
  const userIdSchema = z.string().uuid()

  try {
    const userId = userIdSchema.parse(id)

    const userFound = await knex('users')
    .first()
    .where({
      user_id: userId,
    })

    // Valida se o usuário a ser adicionado nos cookies existe no banco de dados
    if (!userFound) {
      reply.status(404).send({message: 'User not found'})
    }

    reply.cookie('userId', userId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24, // unit: ms - total: 24h
    })
  } catch (error) {
    reply.status(400).send({message: error})
  }
}