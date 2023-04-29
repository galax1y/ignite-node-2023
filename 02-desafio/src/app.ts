import fastify, { FastifyReply, FastifyRequest } from "fastify";

export const app = fastify()

app.get('/', (req: FastifyRequest, res: FastifyReply) => {
  res.send({message: 'Test'})
})