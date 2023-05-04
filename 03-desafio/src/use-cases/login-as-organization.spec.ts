// TDD EM MENTE

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcrypt'
import { LoginAsOrganizationUseCase } from './login-as-organization'

describe('Login as Organization Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let sut: LoginAsOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new LoginAsOrganizationUseCase(organizationsRepository)
  })

  it('should be able to login as an existing organization', async () => {
    const email = 'test@example.com'
    const password = 'test-password'

    const returnedOrg = await organizationsRepository.register({
      email,
      password_hash: await hash(password, 6),
      name_accountable: 'Test accountable',
      contact: '988887777',
      address: 'Rua Teste, 23',
      zipcode: '99888777',
      city: 'Test City',
    })

    // If authentication is successful, it should return information about the logged in organization
    const { organization } = await sut.execute({
      email,
      password,
    })

    expect(organization.id).toEqual(returnedOrg.id)
  })
})
