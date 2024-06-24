import { Client } from '../models/ClientModel'
import { mapClient } from './mapper/Mappers'
import prisma from '../config/prisma'

export class ClientRepository {
  async create(client: Client): Promise<Client> {
    const result = await prisma.client.create({
      data: {
        uuid: client.uuid,
        name: client.name,
        address: client.address,
        phone: client.phone
      }
    })
    return mapClient(result)
  }

  async findAll(): Promise<Client[]> {
    const results = await prisma.client.findMany()
    return results.map(mapClient)
  }

  async findById(uuid: string): Promise<Client | null> {
    const result = await prisma.client.findUnique({
      where: { uuid }
    })
    return result ? mapClient(result) : null
  }

  async update(client: Client): Promise<Client> {
    const result = await prisma.client.update({
      where: { uuid: client.uuid },
      data: {
        name: client.name,
        address: client.address,
        phone: client.phone
      }
    })
    return mapClient(result)
  }

  async delete(uuid: string): Promise<Client> {
    const result = await prisma.client.delete({
      where: { uuid }
    })
    return mapClient(result)
  }
}
