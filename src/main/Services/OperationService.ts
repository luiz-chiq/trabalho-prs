import { Operation } from '../models/OperationModel'
import { OperationRepository } from '../repositories/OperationRepository'

export class OperationService {
  private operationRepository: OperationRepository

  constructor() {
    this.operationRepository = new OperationRepository()
  }

  async createOperation(operation: Operation) {
    return this.operationRepository.create(operation)
  }

  async getAllOperations() {
    return this.operationRepository.findAll()
  }

  async getOperationById(uuid: string) {
    const operation = await this.operationRepository.findById(uuid)
    if (!operation) {
      throw new Error(`Operation with UUID ${uuid} not found`)
    }
    return operation
  }

  async updateOperation(operation: Operation) {
    const operationResult = await this.operationRepository.findById(operation.uuid)
    if (!operationResult) throw new Error(`Operation with UUID ${operation.uuid} not found`)
    return this.operationRepository.update(operation)
  }

  async deleteOperation(uuid: string) {
    const operationResult = await this.operationRepository.findById(uuid)
    if (!operationResult) throw new Error(`Operation with UUID ${uuid} not found`)
    return this.operationRepository.delete(uuid)
  }
}
