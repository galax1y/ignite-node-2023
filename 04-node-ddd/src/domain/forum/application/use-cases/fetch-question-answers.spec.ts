import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase // sut: System Under Test

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch answers for a question', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-2') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-2') }),
    )

    const { answers } = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers for a question', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }
    const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(answers).toHaveLength(2)
  })
})
