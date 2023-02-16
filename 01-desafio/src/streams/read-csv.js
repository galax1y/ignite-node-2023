import {Readable} from 'node:stream'
import {parse} from 'csv-parse'
import {createReadStream} from 'node:fs'
import {stdout} from 'node:process'

const path = new URL('../data/tasks.csv', import.meta.url)

class CSVReaderStream extends Readable {
	async _read() {
		const stream = createReadStream(path)
		const csvParse = parse({delimiter: ',', from_line: 2})
		const lines = stream.pipe(csvParse)

		for await (const line of lines) {
			const [title, description] = line

			await fetch('http://localhost:3333/tasks', {
				method: 'POST',
				body: JSON.stringify({
					title,
					description,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
		}
	}
}

new CSVReaderStream().pipe(stdout)
