import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

// Partial torna todos os campos opcionais
export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    // Propriedades padrões
    authorId: new UniqueEntityID('1'),
    title: 'Example question title',
    slug: Slug.create('example-question-title'),
    content: 'Example question content',

    ...override, // Se houver algo no override, ela sobrescreve as propriedades padrões
  })

  return question
}
