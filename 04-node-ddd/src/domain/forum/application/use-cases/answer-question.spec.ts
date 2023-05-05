import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // sut: System Under Test

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'New answer test',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('New answer test')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
