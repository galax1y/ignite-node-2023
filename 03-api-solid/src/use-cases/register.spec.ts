import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'

// Um teste unitário não pode depender de qualquer coisa que não seja específica do teste.
// ex.: Um teste da lógica do negócio não pode depender de interações com o banco de dados

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    // Passado um objeto 'fake' simulando um Repository, possível por conta da inversão de dependências
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },
      async create(data) {
        return {
          id: 'test-user',
          name: data.name,
          created_at: new Date(),
          email: data.email,
          password_hash: data.password_hash,
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
