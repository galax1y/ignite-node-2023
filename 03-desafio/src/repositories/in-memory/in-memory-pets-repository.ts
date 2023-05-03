import { PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
      adopted_at: null,
    }

    this.pets.push(pet)

    return pet
  }
}
