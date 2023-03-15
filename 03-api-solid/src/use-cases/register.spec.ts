import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

// Um teste unitário não pode depender de qualquer coisa que não seja específica do teste.
// ex.: Um teste da lógica do negócio não pode depender de interações com o banco de dados

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  // Flush antes de qualquer teste
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'fulano@example.com'

    await sut.execute({
      name: 'Fulano',
      email,
      password: '123456',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Ciclano',
        email,
        password: '654321',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
