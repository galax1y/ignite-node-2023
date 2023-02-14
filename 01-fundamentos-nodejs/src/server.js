import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (request, response) => {
	const {method, url} = request

	// middleware json
	await json(request)

	if (method === 'GET' && url === '/users') {
		return response.end(JSON.stringify(users))
	}

	if (method === 'POST' && url === '/users') {
		const { name, email } = request.body
		users.push({
			id: randomUUID(),
			name,
			email,
		})
		return response.writeHead(201).end('Criação de usuário')
	}

	return response.writeHead(404).end('Not found')
})

server.listen(3333)
// localhost:3333
