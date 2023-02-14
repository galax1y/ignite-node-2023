import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (request, response) => {
	const {method, url} = request

	// middleware json
	await json(request, response)

	const route = routes.find(route => {
		return route.method === method  && route.path === url
	})

	if (route) {
		route.handler(request, response)
	}

})

server.listen(3333)
// localhost:3333
