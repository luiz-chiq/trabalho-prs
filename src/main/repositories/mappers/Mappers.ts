import Decimal from 'decimal.js'
import { Client } from '../../models/ClientModel'
import { Operation } from '../../models/OperationModel'
import { OperationType } from '../../models/enums/OperationType'
import { Invoice } from '../../models/InvoiceModel'
import { InvoiceStatus } from '../../models/enums/InvoiceStatus'
import { FinancialRecord } from '../../models/FinancialRecordModel'

export const mapClient = (data: any): Client => {
  return new Client(data.name, data.address, data.phone, data.uuid)
}

export const mapOperation = (data: any): Operation => {
  return new Operation(data.name, new Decimal(data.price), data.type as OperationType, data.uuid)
}

export const mapFinancialRecord = (data: any): FinancialRecord => {
  return new FinancialRecord(
    new Date(data.date),
    data.discount,
    new Operation(
      data.operationName,
      new Decimal(data.unitPrice),
      data.operationType as OperationType,
      data.operationId
    ),
    data.quantity,
    data.invoiceId,
    data.uuid
  )
}

export const mapInvoice = (data: any): Invoice => {
  return new Invoice(
    data.client,
    data.startDate,
    data.endDate,
    data.status as InvoiceStatus,
    data.financialRecords,
    data.uuid
  )
}
