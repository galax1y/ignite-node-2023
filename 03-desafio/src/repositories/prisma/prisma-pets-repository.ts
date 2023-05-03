import { PetsRepository } from '../pets-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
