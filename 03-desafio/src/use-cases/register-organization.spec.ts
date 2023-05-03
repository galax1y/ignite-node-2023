import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

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
      password: 'test-password',
      accountable: 'Test accountable',
      whatsapp: '988887777',
      address: 'Rua Teste, 23',
      cep: '99888777',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})
