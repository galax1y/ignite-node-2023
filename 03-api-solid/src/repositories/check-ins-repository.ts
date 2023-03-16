import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  // UncheckedCreateInput do Prisma considera que os objetos Gym e User já estão criados
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}
