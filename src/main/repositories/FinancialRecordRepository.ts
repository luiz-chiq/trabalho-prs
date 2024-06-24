import { FinancialRecord } from '../models/FinancialRecordModel'
import { mapFinancialRecord } from './mapper/Mappers'
import prisma from '../config/prisma'

export class FinancialRecordRepository {
  async create(financialRecord: FinancialRecord): Promise<FinancialRecord> {
    const result = await prisma.financialRecord.create({
      data: {
        uuid: financialRecord.uuid,
        date: financialRecord.date,
        unitPrice: financialRecord.unitPrice.toString(),
        quantity: financialRecord.quantity,
        discount: financialRecord.discount,
        totalPrice: financialRecord.totalPrice.toString(),
        operationType: financialRecord.operationType,
        operationName: financialRecord.operationName,
        operationId: financialRecord.operationId,
        invoiceId: financialRecord.invoiceId
      }
    })
    return mapFinancialRecord(result)
  }

  async findAll(): Promise<FinancialRecord[]> {
    const financialRecords = await prisma.financialRecord.findMany()
    return financialRecords.map(mapFinancialRecord)
  }

  async findById(uuid: string): Promise<FinancialRecord | null> {
    const financialRecord = await prisma.financialRecord.findUnique({
      where: { uuid: uuid }
    })
    return financialRecord ? mapFinancialRecord(financialRecord) : null
  }

  async update(financialRecord: FinancialRecord): Promise<FinancialRecord> {
    const result = await prisma.financialRecord.update({
      where: { uuid: financialRecord.uuid },
      data: {
        date: financialRecord.date,
        unitPrice: financialRecord.unitPrice.toString(),
        quantity: financialRecord.quantity,
        discount: financialRecord.discount,
        totalPrice: financialRecord.totalPrice.toString(),
        operationType: financialRecord.operationType,
        operationName: financialRecord.operationName,
        operationId: financialRecord.operationId,
        invoiceId: financialRecord.invoiceId
      }
    })
    return mapFinancialRecord(result)
  }

  async delete(uuid: string): Promise<FinancialRecord> {
    const result = await prisma.financialRecord.delete({
      where: { uuid: uuid }
    })
    return mapFinancialRecord(result)
  }
}
