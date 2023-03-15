import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'
import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'

// SUT -> System Under Test, uma nomenclatura padrão adotada pela comunidade

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const email = 'fulano@example.com'
    const password = '123456'

    // Create a test user in the repository, collect the returned user id for comparison
    const { id } = await usersRepository.create({
      name: 'Fulano',
      email,
      password_hash: await hash(password, 6),
    })

    // Execute authentication, if successful, user will be returned
    const { user } = await sut.execute({
      email,
      password,
    })

    // Compare returned user's id with the test user id
    expect(user.id).toEqual(id)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(async () => {
      await sut.execute({
        email: 'fulano@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const email = 'fulano@example.com'
    const password = '123456'

    // Create a test user with password -> '123456'
    await usersRepository.create({
      name: 'Fulano',
      email,
      password_hash: await hash(password, 6),
    })

    // Try authenticating in the same email but with different password -> '1234567'
    expect(async () => {
      await sut.execute({
        email,
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
