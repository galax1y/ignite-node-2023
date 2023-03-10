Esse é um resumo onde vou anotar informações novas ou pontuais ou que acredito que vale a pena relembrar

### Importação no NodeJS

Por padrão o NodeJS não aceita o padrão de importação com as keywords `import/export/from` do `ESModules`
Usa o `CommonJS` onde a importação de pacotes é feito com a keyword `require`

E para alterar para o `ESModules` basta ir no arquivo de configuração do pacote `package.json` e adicionar `"type": "module"`

```js
// CommonJS
const http = require('http')

// ESModules
import http from 'http';
```

### Criando um servidor MUITO básico

```js
const http = require('http')

const server = http.createServer((request, response) => {
	return response.end('Hello World')
})

server.listen(3333)
```

Rodar o servidor (e alterar o servidor quando detectar mudanças): `node --watch src/server.js`

Adicionando um script no `package.json` para não ter que ficar digitando isso toda vez e agora o atalho é `npm run dev`
  ```json
  "scripts": {
    "dev": "node --watch src/server.js",
    ...
  }
  ```

### Prefixo na importação

Usar o prefixo `node:` na importação comunica para o NodeJS que o pacote sendo importado é nativo do NodeJS

```js
import http from 'node:http'
```

### Métodos HTTP principais (REST API)

- GET     => Buscar um recurso do back-end
- POST    => Criar um recurso no back-end
- PUT     => Atualizar um recurso no back-end
- PATCH   => Atualizar uma informação específica de um recurso no back-end
- DELETE  => Deletar um recurso no back-end

### Status code
Mensagens que são repassadas na requisição ou resposta para indicar qual foi o resultado da operação.

ex.: `200 - OK` `404 - Not Found` `500 - Internal Server Error`

Tabelas no Google, só pesquisar

### Metadados

Os cabeçalhos dos requests/responses HTTP carregam informações importantes em vários sentidos.

Uma informação crucial é o formato como os dados são enviados/retornados nas requisições, comunicando ao cliente/servidor como deve proceder para lidar com eles.

### Aplicação Stateful

Uma aplicação `stateful` guarda os dados na memória do servidor durante a execução do mesmo.

É uma abordagem incomum quando se fala de desenvolvimento web, porque se a aplicação desliga, a memória é resetada e os dados armazenados não persistem.

É uma ferramenta quando se trata de certos fluxos de execução dentro do site, mas quando alguma parte do processo depende de dados, é superior usar a abordadem `stateless`.

### Streams

Aplicação principal - Leitura/recepção de arquivos por partes.

Serviços de Streaming como Netflix e Spotify não mandam o filme/podcast inteiro ao usuário, mas sim por partes, o que facilita para o aparelho do cliente e para o servidor na gestão dos seus recursos.

Outro exemplo, que é mais possível de acontecer - Arquivos CSV gigantes (1Gb+) que devem ser persistidos no banco de dados, mas o usuário que faz upload tem a Internet com capacidade de upload de 10mb/s apenas. Então, a medida que formos recebendo os dados, por que não inserir já no database? A outra alternativa é esperar todo o tempo para os dados chegarem e inserir no banco tudo de uma vez, o que é claramente mais intenso computacionalmente.

A questão é que no NodeJS, várias interações são codadas com base em Streams, e além disso, é um modelo que encaixa na realidade, já que na Internet e nos computadores de forma geral, o upload/download/leitura de arquivos não acontece instantaneamente, e quando for necessário o arquivo completo (JSON, por exemplo), basta esperar com uma estrutura `async - await`.

Em requisições HTTP, `req` e `res` são Streams

**Readable streams** are used in operations where data is read, such as **`reading data from a file or streaming video`**.

**Writable streams** are used in operations where data is written, such as **`writing or updating data`** to a file.

**Duplex streams** can be used to perform both **`read and write`** operations. A typical example of a duplex stream is a socket, which can be used for two-way communication, such as in a real-time chat app.

**Transform streams** are duplex streams that **`perform transformations on the data`** being processed. Operations such as compression and extraction use transform streams.

### Buffers

O Buffer é uma representação de um espaço na memória do computador para transitar dados rapidamente, e depois, limpar a memória, tudo de maneira performática.

```js
const buf = Buffer.from("hello")
```

Cada entrada no Buffer é um hex <=> bin convertido de acordo com a tabela ASCII para o respectivo caractere.

### Middleware

Pode ser interpretado como um interceptador das requisições, tratando-as para se adequar aos proximos passos da aplicação.

Um exemplo de middleware comum nas requisições HTTP, por exemplo, é a conversão dos dados no corpo da requisição para JSON ou String.

### File System

No arquivo `database.js`
```js
import fs from 'node:fs/promises'
class Database {

  // Ler dados do arquivo db.json
  constructor() {
    // fs.readFile('path', encoding)
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    // Se o arquivo não existir, criar um db.json com um objeto vazio
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    // fs.writeFile('path', data)
    fs.writeFile('db.json', JSON.stringify(this.#database))
  }

  insert(table, data) {
    ...
    // Persistir novos dados inseridos no banco de dados
    #persist()
  }
}
```

### Parâmetros de requisições HTTP

#### Query parameters

São recebidos concatenados na URL
`http://example.com` + **`?idParameter=1&nameParameter=Lucas`**

Normalmente não recebem informações sensíveis para usar como filtro ou paginação.
Os parâmetros podem ser múltiplos e podem ter nome. Recebendo vários parâmetros com mesmo nome e valores diferentes podemos criar até arrays.

#### Route parameters

Também são recebidos na URL mas com uma estrutura diferente
`http://example.com` + `/users/1`

Normalmente não recebem informações sensíveis e são usados para identificação de recursos

#### Request Body

É recebido no corpo da requisição, onde passa pelo protocolo HTTPS (mais segurança) e é por onde deve passar a maior parte dos dados sensíveis ou não.