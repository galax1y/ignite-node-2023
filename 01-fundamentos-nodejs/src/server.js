import { randomUUID } from 'node:crypto'
import http from 'node:http'

const users = []

const server = http.createServer(async (request, response) => {
	const {method, url} = request

	const buffers = []

	for await (const chunk of request) {
		buffers.push(chunk)
	}

	try {
		request.body = JSON.parse(Buffer.concat(buffers).toString())
	} catch (error) {
		console.log(error)
	}

	if (method === 'GET' && url === '/users') {
		return response
			.setHeader('Content-type', 'application/json')
			.end(JSON.stringify(users))
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
