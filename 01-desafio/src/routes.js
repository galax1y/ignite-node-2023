// Antes das rotas, vamos entender qual a estrutura (propriedades) que uma task deve ter:

// - `id` - Identificador único de cada task
// - `title` - Título da task
// - `description` - Descrição detalhada da task
// - `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
// - `created_at` - Data de quando a task foi criada.
// - `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

// Requerimentos faltando
// - E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV

import {randomUUID} from 'crypto'
import {Database} from './database.js'
import {buildRoutePath} from './utils/build-route-path.js'

const database = new Database()

export const routes = [
	// - Criação de uma task
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			console.log('Handling route POST')
			const {title, description} = req.body

			database.insert('tasks', {title, description})

			res.writeHead(201).end()
		},
	},
	// - Listagem de todas as tasks
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			console.log('Handling route GET')
			const tasks = database.select('tasks')

			res.writeHead(200).end(JSON.stringify(tasks))
		},
	},

	// - Atualização de uma task pelo `id`
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			console.log('Handling route PUT')
			const {id} = req.params
			const {title, description} = req.body

			database.update('tasks', {id, title, description})

			res.writeHead(204).end()
		},
	},
	// - Remover uma task pelo `id`
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			console.log('Handling route DELETE')
			const {id} = req.params

			database.delete('tasks', id)

			res.writeHead(204).end()
		},
	},
	// - Marcar pelo `id` uma task como completa
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			console.log('Handling route PATCH')
			const {id} = req.params
			database.complete('tasks', id)

			return res.writeHead(204).end()
		},
	},
]
