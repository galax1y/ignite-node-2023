import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

// Um teste unitário não pode depender de qualquer coisa que não seja específica do teste.
// ex.: Um teste da lógica do negócio não pode depender de interações com o banco de dados

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    // Passado um objeto 'fake' simulando um Repository, possível por conta da inversão de dependências
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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

  it('should not be able to register with the same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const emailToRepeat = 'fulano@example.com'

    await registerUseCase.execute({
      name: 'Fulano',
      email: emailToRepeat,
      password: '123456',
    })

    expect(async () => {
      await registerUseCase.execute({
        name: 'Ciclano',
        email: emailToRepeat,
        password: '654321',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
