import { ClientRepository } from '../repositories/ClientRepository'
import { Client } from '../models/ClientModel'

export class ClientService {
  private clientRepository: ClientRepository

  constructor() {
    this.clientRepository = new ClientRepository()
  }

  async createClient(client: Client) {
    // Adicione qualquer lógica de negócios necessária antes de criar um cliente
    return this.clientRepository.create(client)
  }

  async getAllClients() {
    return this.clientRepository.findAll()
  }

  async getClientById(uuid: string) {
    const client = await this.clientRepository.findById(uuid)
    if (!client) {
      throw new Error(`Client with UUID ${uuid} not found`)
    }
    return client
  }

  async updateClient(client: Client) {
    const clientResult = await this.clientRepository.findById(client.uuid)
    if (!clientResult) throw new Error(`Client with UUID ${client.uuid} not found`)
    return this.clientRepository.update(client)
  }

  async deleteClient(uuid: string) {
    const client = await this.clientRepository.findById(uuid)
    if (!client) throw new Error(`Client with UUID ${uuid} not found`)
    return this.clientRepository.delete(uuid)
  }
}
