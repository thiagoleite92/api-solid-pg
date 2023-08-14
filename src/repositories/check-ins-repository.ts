import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<Array<CheckIn>>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
