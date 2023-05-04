import { PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      ...data,
      id: randomUUID(), // No prisma é automático
      adopted_at: null, // No prisma é automático
    }

    this.pets.push(pet)

    return pet
  }

  async findManyByOrg(orgId: string): Promise<Pet[]> {
    const pets: Pet[] = this.pets.filter((pet) => pet.orgId === orgId)

    return pets
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === petId)

    return pet ?? null
  }
}
