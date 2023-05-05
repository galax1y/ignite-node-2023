import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  async create(answer: Answer): Promise<void> {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer test',
  })

  expect(answer.content).toEqual('New answer test')
})
