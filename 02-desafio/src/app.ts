import fastify from "fastify";
import cookie from '@fastify/cookie'
import { usersRoutes } from "./routes/users";
import { mealsRoutes } from "./routes/meals";

export const app = fastify()

// Registrar plugin de cookies do Fastify 
app.register(cookie)

// baseURL/users
app.register(usersRoutes, {prefix: 'users'})

// baseURL/meals - Rota autenticada com cookie
app.register(mealsRoutes, { prefix: 'meals'})