import { FinancialRecordRepository } from '../repositories/FinancialRecordRepository'
import { FinancialRecord } from '../models/FinancialRecordModel'

export class FinancialRecordService {
  private financialRecordRepository: FinancialRecordRepository

  constructor() {
    this.financialRecordRepository = new FinancialRecordRepository()
  }

  async createFinancialRecord(financialRecord: FinancialRecord): Promise<FinancialRecord> {
    return this.financialRecordRepository.create(financialRecord)
  }

  async getAllFinancialRecords(): Promise<FinancialRecord[]> {
    return this.financialRecordRepository.findAll()
  }

  async getFinancialRecordById(uuid: string): Promise<FinancialRecord> {
    const financialRecord = await this.financialRecordRepository.findById(uuid)
    if (!financialRecord) {
      throw new Error(`FinancialRecord with UUID ${uuid} not found`)
    }
    return financialRecord
  }

  async updateFinancialRecord(financialRecord: FinancialRecord): Promise<FinancialRecord> {
    const financialRecordResult = await this.financialRecordRepository.findById(
      financialRecord.uuid
    )
    if (!financialRecordResult)
      throw new Error(`FinancialRecord with UUID ${financialRecord.uuid} not found`)
    return this.financialRecordRepository.update(financialRecord)
  }

  async deleteFinancialRecord(uuid: string): Promise<FinancialRecord> {
    const financialRecord = await this.financialRecordRepository.findById(uuid)
    if (!financialRecord) throw new Error(`FinancialRecord with UUID ${uuid} not found`)
    return this.financialRecordRepository.delete(uuid)
  }
}
