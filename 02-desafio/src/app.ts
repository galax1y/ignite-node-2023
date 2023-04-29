import fastify from "fastify";
import { usersRoutes } from "./routes/users";

export const app = fastify()

// baseURL/users
app.register(usersRoutes, {prefix: 'users'})