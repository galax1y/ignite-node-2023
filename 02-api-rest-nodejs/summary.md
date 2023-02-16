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