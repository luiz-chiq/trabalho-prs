import { Operation } from '../models/OperationModel'
import { mapOperation } from './mapper/Mappers' // Suponha que você tenha colocado a função de mapeamento em um arquivo separado.
import prisma from '../config/prisma'

export class OperationRepository {
  async create(operation: Operation): Promise<Operation> {
    const result = await prisma.operation.create({
      data: {
        uuid: operation.uuid,
        name: operation.name,
        price: operation.price.toString(), // Armazena como string no banco de dados
        type: operation.type
      }
    })
    return mapOperation(result)
  }

  async findAll(): Promise<Operation[]> {
    const operations = await prisma.operation.findMany()
    return operations.map(mapOperation)
  }

  async findById(uuid: string): Promise<Operation | null> {
    const operation = await prisma.operation.findUnique({
      where: { uuid: uuid }
    })
    return operation ? mapOperation(operation) : null
  }

  async update(operation: Operation): Promise<Operation> {
    const result = await prisma.operation.update({
      where: { uuid: operation.uuid },
      data: {
        name: operation.name,
        price: operation.price.toString(), // Armazena como string no banco de dados
        type: operation.type
      }
    })
    return mapOperation(result)
  }

  async delete(uuid: string): Promise<Operation> {
    const result = await prisma.operation.delete({
      where: { uuid: uuid }
    })
    return mapOperation(result)
  }
}
