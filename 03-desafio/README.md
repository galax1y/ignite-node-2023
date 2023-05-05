Informações abaixo copiadas da proposta do desafio

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

---

## Análise

O módulo usou uma estrutura muito bem definida

Controllers - Lidam com a recepção e encaminhamento de chamadas HTTP
Repositories - Interface que permite a interação com banco de dados
Use Cases / Services - Cada um contém a parte lógica de uma rota ex.: validação, cálculos, persistência no banco, etc.

Também usou Docker e Docker-compose pra disponibilizar um banco Postgres, já eu vou me reter a usar sqlite, e no final do desafio tento implementar, isso vai evitar vários problemas que não são o foco do módulo.

Estrutura dos dados:

* Um pet deve estar ligado a uma ORG

* Uma ORG precisa ter um endereço e um número de WhatsApp

* Para listar os pets, obrigatoriamente precisamos informar a cidade

* O usuário que quer adotar, entrará em contato com a ORG via WhatsApp

* Deve ser possível realizar login como uma ORG

Uma ORG tem:
  - ID único
  - Um ou mais pets associados
  - Rota de cadastro (Email, senha, CEP, endereço, nº Whatsapp, nome do responsável)

Um PET tem:
  - ORG associada - @foreign-key c/ o id da ORG
  - Características (idade, porte, nível de energia, nível de independência)
  - Cidade
  - Flag isAdopted