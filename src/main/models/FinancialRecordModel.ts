import Decimal from 'decimal.js'
import { v4 as uuidv4 } from 'uuid'
import { Operation } from './OperationModel'
import { OperationType } from './enums/OperationType'

interface FinancialRecordDTO {
  uuid: string
  date: string
  unitPrice: string
  quantity: number
  discount: number
  totalPrice: string
  operationType: OperationType
  operationName: string
  operationId: string
  clientId: string
  invoiceId: string
}

export class FinancialRecord {
  uuid: string
  date: Date
  unitPrice: Decimal
  quantity: number
  discount: number
  totalPrice: Decimal
  operationType: OperationType
  operationName: string
  operationId: string
  clientId: string
  invoiceId: string

  constructor(
    date: Date,
    discount: number,
    operation: Operation,
    quantity: number,
    clientId: string,
    invoiceId: string,
    uuid?: string,
    totalPrice?: Decimal
  ) {
    this.uuid = uuid || uuidv4()
    this.date = date
    this.operationType = operation.type
    this.operationName = operation.name
    this.quantity = quantity
    this.discount = discount
    this.unitPrice = operation.price
    this.totalPrice =
      totalPrice ||
      this.unitPrice.times(quantity).times(discount <= 1 && discount >= 0 ? 1 - discount : 1)
    this.operationId = operation.uuid
    this.clientId = clientId
    this.invoiceId = invoiceId
  }

  toDTO(): FinancialRecordDTO {
    return {
      uuid: this.uuid,
      date: this.date.toLocaleDateString(),
      unitPrice: this.unitPrice.toString(),
      quantity: this.quantity,
      discount: this.discount,
      totalPrice: this.totalPrice.toString(),
      operationType: this.operationType,
      operationName: this.operationName,
      operationId: this.operationId,
      clientId: this.clientId,
      invoiceId: this.invoiceId
    }
  }

  static fromDTO(dto: FinancialRecordDTO): FinancialRecord {
    const operation = new Operation(
      dto.operationName,
      new Decimal(dto.unitPrice),
      dto.operationType,
      dto.operationId
    )
    return new FinancialRecord(
      new Date(dto.date),
      dto.discount,
      operation,
      dto.quantity,
      dto.clientId,
      dto.invoiceId,
      dto.uuid,
      new Decimal(dto.totalPrice)
    )
  }
}
