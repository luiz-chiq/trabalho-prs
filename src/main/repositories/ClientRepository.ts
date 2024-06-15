import { PrismaClient } from '@prisma/client'
import { Client } from '../models/ClientModel'
const prisma = new PrismaClient()

export class ClientRepository {
  async create(client: Client) {
    return await prisma.client.create({
      data: {
        uuid: client.uuid,
        name: client.name,
        nickname: client.nickname || '',
        address: client.address,
        phone: client.phone
      }
    })
  }

  async findAll() {
    return await prisma.client.findMany()
  }

  async findById(uuid: string) {
    return await prisma.client.findUnique({
      where: { uuid }
    })
  }

  async update(client: Client) {
    return await prisma.client.update({
      where: { uuid: client.uuid },
      data: {
        name: client.name,
        nickname: client.nickname || '',
        address: client.address,
        phone: client.phone
      }
    })
  }

  async delete(uuid: string) {
    return await prisma.client.delete({
      where: { uuid }
    })
  }
}
