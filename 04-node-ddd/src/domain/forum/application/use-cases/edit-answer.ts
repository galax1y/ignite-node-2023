import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string

  // Conteúdo que pode ser editado
  content: string
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  // Dependency Injection - Repository Pattern
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {}
  }
}
