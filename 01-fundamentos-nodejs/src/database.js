import fs from 'node:fs/promises'

// Pega o caminho desse arquivo database.js, volta uma pasta e aponta para o arquivo db.json
// Isso é feito para garantir que o método de persistir aponte sempre pro mesmo arquivo
// independentemente do diretório onde database.js for executado
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []
    
    if (search) {
      data = data.filter( row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value)
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    }
    else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(entry => entry.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, data) {
    const { id, name, email } = data

    const rowIndex= this.#database[table].findIndex(entry => entry.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1, {
        id: id,
        name: name,
        email: email
      })
      this.#persist()
    }
  }
}