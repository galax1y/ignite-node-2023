import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcrypt'

describe('Register Organization Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: RegisterOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register a new organization', async () => {
    const { organization } = await sut.execute({
      email: 'test@example.com',
      password: 'test',
      name_accountable: 'Test accountable',
      contact: '988887777',
      address: 'Rua Teste, 23',
      zipcode: '99888777',
    })

    const doesPasswordMatch = await compare('test', organization.password_hash)

    expect(organization.id).toEqual(expect.any(String))
    expect(doesPasswordMatch).toEqual(true)
  })
})
