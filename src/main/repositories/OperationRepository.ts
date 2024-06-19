import { PrismaClient } from '@prisma/client'
import { Operation } from '../models/OperationModel'
import { OperationType } from '../models/enums/OperationType'

const prisma = new PrismaClient()

export class OperationRepository {
  async create(operation: Operation) {
    return await prisma.operation.create({
      data: {
        id: operation.uuid,
        name: operation.name,
        price: operation.price,
        type: operation.type
      }
    })
  }

  async findAll(): Promise<Operation[]> {
    const operations = await prisma.operation.findMany()
    return operations.map((op) => new Operation(op.name, op.price, op.type as OperationType, op.id))
  }

  async findById(id: string): Promise<Operation | null> {
    const operation = await prisma.operation.findUnique({
      where: { id }
    })
    if (!operation) return null
    return new Operation(
      operation.name,
      operation.price,
      operation.type as OperationType,
      operation.id
    )
  }

  async update(operation: Operation) {
    return await prisma.operation.update({
      where: { id: operation.uuid },
      data: {
        name: operation.name,
        price: operation.price,
        type: operation.type
      }
    })
  }

  async delete(id: string) {
    return await prisma.operation.delete({
      where: { id }
    })
  }
}
