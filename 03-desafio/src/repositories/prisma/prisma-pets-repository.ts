import { PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findManyByOrg(orgId: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        orgId,
      },
    })

    return pets
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }
}
