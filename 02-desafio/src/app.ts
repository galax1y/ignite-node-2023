import fastify from "fastify";
import cookie from '@fastify/cookie'
import { usersRoutes } from "./routes/users";

export const app = fastify()

// Registrar plugin de cookies do Fastify 
app.register(cookie)

// baseURL/users
app.register(usersRoutes, {prefix: 'users'})