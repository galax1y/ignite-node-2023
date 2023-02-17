# Fastify

Um web framework pra Node.js, parecido com o Express mas é atualizado com maior frequência e tem algumas funcionalidades a mais que o Express precisa de outras bibliotecas pra suprir.

Inicialização rápida:

`npm i typescript -D`, `npm i @types/node -D` e `npm i fastify`

```ts
import fastify from 'fastify'

const app = fastify()

app.get('/nome-da-rota', () => {
  // função com a resposta
  return 'hey'
})

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log('HTTP Server running on port 3333')
	})
```

Pra rodar:

`npx tsc <caminho-para-o-arquivo>`
`node <caminho-para-o-arquivo>`

Esse caminho é um tanto chato, então usando a lib `npm i tsx -D` podemos fazer tudo com um único comando `npx tsx <caminho-para-o-arquivo>` **EM AMBIENTE DE DESENVOLVIMENTO**.

Recomendável até colocar como script no package.json, exemplo.:

```json
{
  ...
  "scripts": {
    "dev": "tsx watch src/server.ts",
    ...
  }
  ...
}
```

### Plugins do fastify

Depois de criado o servidor e ele está ouvindo, podemos separar as rotas em outros arquivos e registrá-los na aplicação fastify como plugins, tornando o código menos complexo, mais 
limpo, etc.

Plugins do fastify.:
- Precisam ser funções assíncronas
- Recebem a instância do fastify como parâmetro (o servidor) do tipo `FastifyInstance`

Em routes/transactions.ts pode ser colocada uma rota:

```ts
import { knex } from '../database'
import { FastifyInstance } from 'fastify'

export async function transactionsRoutes(app: FastifyInstance) {
  const fetchTransactions = await knex('transactions')
    .where('amount', 1337)
    .select('title')

  return fetchTransactions
}
```

No arquivo server.ts registramos o plugin:

```ts
import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
```

### Validando request na rota do Fastify c/ zod e Typescript

```ts
  // rota fastify
  app.post('/hello', async (request) => {
    const createRequestBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createRequestBodySchema.parse(request.body)
    ...
  })
```

### Retornando status code e outras informações no Fastify

```ts
...
app.post('/', async (request, reply) => {
  reply.status(<status_code>).send(<payload>)
})
```

### Hook global (para um contexto)

Em um plugin, podemos passar um hook global servindo como middleware pra todos as rotas dentro dele:

```ts
  app.addHook('preHandler', globalFunction)
```

# Testes automatizados 

**TEMA IMPORTANTE**

Testes automatizados aumentam a confiança para manter o código a longo prazo.

#### Teste unitário
Testa uma pequena parte da sua aplicação de forma isolada.

#### Teste de integração
Testa a comunicação entre duas ou mais unidades da aplicação

#### Teste end2end (ponta-a-ponta)
Simulam um usuário usando a aplicação, engloba todas as funcionalidades.
Front-end: Abrir a página, digitar nos campos login e senha, clicar no botão...
Back-end: Chamadas HTTP, websockets

### Vitest

É um framework de testes unitários mantido pela Vite.

Fornece uma API compatível com o Jest, com a diferença que a prioridade do Vitest é ser mais performático e mais fácil de configurar.

`npm i vitest -D`

Criar uma pasta `test` e adicionar um arquivo `<filename>.spec.ts` ou `<filename>.test.ts`

No arquivo.:

```ts
import { test } from 'vitest'

test('user should be able to do something', () => {
  let variavel = 100 + 200 + 30 + 4 // operação (qualquer coisa)
  expect(variavel).toEqual(1234) // validação
})
```

Para rodar todos os testes:

`npx vitest`