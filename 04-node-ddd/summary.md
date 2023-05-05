# Domain-driven Design - DDD

Princípio: Comunicação clara e organizada entre todas as partes do desenvolvimento de uma aplicação.

Não é associado a algum framework ou paradigma de programação, é mais como um processo pra identificar os problemas envolvidos, as entidades, casos de uso com a finalidade de montar um modelo do projeto que seja alinhado com as necessidades e linguajar do cliente.

## Conceitos do DDD

> ### Domain Expert
> É o expert que conhece sobre o processo do negócio e opera seus sistemas. É o membro mais adequado da empresa contratante para conversar com os desenvolvedores de modo a identificar as entidades, regras de negócio e outras características para construir uma aplicação coerente com as necessidades e expectativas. 

> ### Ubiquitous Language
> A linguagem/terminologia deve ser adaptada ao contexto do negócio (dia a dia da empresa contratante). O time de desenvolvimento deve falar diretamente com o **Domain Expert** para extrair essa linguagem ubíqua.

A partir da conversa com o Domain Expert, extraem-se informações sobre as dificuldades enfrentadas e como o software pode auxiliar no processo.

Ex.: Contexto de um fórum educacional, onde o Domain Expert é um instrutor que responde às dúvidas dos alunos que vão sendo postadas.

- Dificuldade em saber as dúvidas dos alunos
- Eu tenho que responder os alunos e me perco em quais dúvidas já foram respondidas

Essas frases já identificam algumas entidades e casos de uso:

**Entidades:**
Eu -> Instrutor
Alunos
Dúvidas

**Casos de uso**
Eu - Responder - Alunos -> Caso de uso

---

As declarações abaixo são equivalentes

```ts
class Foo {
    private bar: string;
    constructor(bar: string) {
        this.bar = bar;
    }
}

class Foo {
    constructor(private bar: string) {}
}
```

---

## Clean Arquitecture

![Clear Arquitecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

**Arquitetura limpa** é, principalmente, o conceito de **desacoplamento** entre as camadas da aplicação, separando as responsabilidades.

Uma camada pode depender e usar de qualquer informação contida nela, mas não pode usar informações externas. Ex.: Use Cases pode depender de dados vindos de Entities, mas não pode depender da camada de Controllers (segue-se a seta na imagem)

Clean Arquitecture e DDD podem ser usados em conjunto.

Clean Arquitecture tem muito a ver com o código em si, a estrutura de pastas e interações entre os módulos, enquanto DDD está mais para uma metodologia de identificação da estrutura dos dados necessária e o planejamento da aplicação em alto nível.

