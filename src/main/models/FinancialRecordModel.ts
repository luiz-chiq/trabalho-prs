import Decimal from 'decimal.js'
import { v4 as uuidv4 } from 'uuid'
import { Operation } from './OperationModel'
import { OperationType } from './enums/OperationType'

export class FinancialRecord {
  uuid: string
  date: Date
  unitPrice: number
  quantity: number
  discount: number
  totalPrice: number
  operationType: OperationType
  operationName: string
  operationId: string
  invoiceId: string

  constructor(
    date: Date,
    discount: number,
    operation: Operation,
    quantity: number,
    invoiceId: string,
    uuid?: string,
    totalPrice?: number
  ) {
    this.uuid = uuid || uuidv4()
    this.date = date
    this.operationType = operation.type
    this.operationName = operation.name
    this.quantity = quantity
    this.discount = discount
    this.unitPrice = operation.price.toNumber()
    this.totalPrice =
      totalPrice ||
      new Decimal(this.unitPrice)
        .times(quantity)
        .times(discount <= 1 && discount >= 0 ? 1 - discount : 1)
        .toNumber()
    this.operationId = operation.uuid
    this.invoiceId = invoiceId
  }
}
