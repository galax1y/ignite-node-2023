import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      is_adopted: false,
      age: data.age,
      energy: data.energy,
      independence: data.independence,
      size: data.size,
      organizationId: data.organizationId,
    }

    this.pets.push(pet)

    return pet
  }
}
