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

Rodar o servidor: `node src/server.js`