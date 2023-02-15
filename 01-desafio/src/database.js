import {randomUUID} from 'node:crypto'
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
	#database = {}

	constructor() {
		console.log('Database initialized')
		fs.readFile(databasePath, 'utf-8')
			.then((data) => {
				this.#database = JSON.parse(data)
			})
			.catch(() => {
				this.#persist()
			})
	}

	#persist() {
		console.log('Persisting')
		fs.writeFile(databasePath, JSON.stringify(this.#database))
	}

	select(table) {
		// se a tabela não existir, tratar como um array vazio
		let data = this.#database[table] ?? []
		return data
	}

	insert(table, data) {
		const {title, description} = data

		const newEntry = {
			id: randomUUID(),
			title,
			description,
			completed_at: null,
			created_at: new Date(),
			updated_at: null,
		}

		if (!this.#database[table]) {
			this.#database[table] = {}
		}

		this.#database[table].push(newEntry)
		this.#persist()
	}

	update(table, data) {
		const {id, title, description} = data
		const entry = this.#database[table].find((task) => task.id === id)

		if (entry) {
			entry.title = title
			entry.description = description
			entry.updated_at = new Date()
		}
		this.#persist()
	}

	delete(table, id) {
		const entryIndex = this.#database[table].findIndex((task) => task.id === id)

		if (entryIndex > -1) {
			this.#database[table].splice(entryIndex, 1)
		}
		this.#persist()
	}
}
