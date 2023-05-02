Informações abaixo copiadas da proposta do desafio

### Regras da aplicação

- Deve ser possível criar um usuário
- Deve ser possível identificar o usuário entre as requisições
- Deve ser possível registrar uma refeição feita, com as seguintes informações:
    
    *As refeições devem ser relacionadas a um usuário.*
    
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível visualizar uma única refeição
- Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência por dia de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

---

### Minha análise

Duas entidades principais: **Users** e **Meals**

As rotas de **Meals** dependem de um **User** estar autenticado

Então quando criar um User, vou colocar o id dele nos cookies pra usar como autenticação, e um middleware pra checar.

Abstração de um usuário (User):
- user_id: string - uuid

Abstração de uma refeição (Meal):
- meal_id: string - uuid
- name: string - requerido
- description: string
- created_at: Date - default timestamp now()
- is_healthy: boolean
- user_id: string - foreign key @map c/ users

TDD foi mostrado no proximo módulo, então não coloquei em prática nesse projeto de propósito

Checklist testes:

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita
- [x] Deve ser possível editar uma refeição
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
    - [x] Quantidade total de refeições registradas
    - [x] Quantidade total de refeições dentro da dieta
    - [x] Quantidade total de refeições fora da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

Como os testes não foram especificados, só fiz os testes afirmativos que apareceram no enunciado
 