import Decimal from 'decimal.js'
import { Client } from '../../models/ClientModel'
import { Operation } from '../../models/OperationModel'
import { OperationType } from '../../models/enums/OperationType'
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
    data.clientId,
    data.invoiceId,
    data.uuid,
    new Decimal(data.totalPrice)
  )
}
