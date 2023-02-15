export class Database {
	#database = {}

	constructor() {
		console.log('Database initialized')
		this.#database['tasks'] = []
	}

	select(table) {
		const tasks = this.#database[table]
		return tasks
	}

	insert(table, data) {
		this.#database[table].push(data)
		this.#persist()
	}

	delete(table, id) {
		this.#persist()
	}

	update(table, id) {
		this.#persist()
	}

	#persist() {
		console.log('Persist placeholder')
		// save data in db.json
	}
}
