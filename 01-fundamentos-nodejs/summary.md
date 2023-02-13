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
