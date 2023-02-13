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