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

const database = new Database()

export const routes = [
	// - Criação de uma task
	{
		method: 'POST',
		path: '/tasks',
		handler: (req, res) => {
			const {title, description} = req.body

			database.insert('tasks', {
				id: randomUUID(),
				title,
				description,
				completed_at: null,
				created_at: new Date(),
				updated_at: null,
			})

			return res.writeHead(201).end()
		},
	},
	// - Listagem de todas as tasks
	{
		method: 'GET',
		path: '/tasks',
		handler: (req, res) => {
			console.log('Handling route GET')
			const tasks = database.select('tasks')

			return res.writeHead(200).end(JSON.stringify(tasks))
		},
	},

	// - Atualização de uma task pelo `id`
	{
		method: 'PUT',
		path: '/tasks',
		handler: (req, res) => {},
	},
	// - Remover uma task pelo `id`
	{
		method: 'DELETE',
		path: '/tasks',
		handler: (req, res) => {},
	},
	// - Marcar pelo `id` uma task como completa
	{
		method: 'PATCH',
		path: '/tasks',
		handler: (req, res) => {},
	},
	{
		method: 'GET',
		path: '/tasks',
		handler: (req, res) => {},
	},
]
