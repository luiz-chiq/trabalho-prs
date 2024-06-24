import Decimal from 'decimal.js'
import { v4 as uuidv4 } from 'uuid'
import { Operation } from './OperationModel'
import { OperationType } from './enums/OperationType'

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
    uuidid?: string,
    totalPrice?: Decimal
  ) {
    this.uuid = uuidid || uuidv4()
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
}
