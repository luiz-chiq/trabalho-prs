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

  constructor(
    date: Date,
    discount: number,
    operation: Operation,
    quantity: number,
    id?: string,
    totalPrice?: Decimal
  ) {
    this.uuid = id || uuidv4()
    this.date = date
    this.operationType = operation.type
    this.operationName = operation.name
    this.quantity = quantity
    this.discount = discount
    this.unitPrice = operation.price
    this.totalPrice =
      totalPrice ||
      this.unitPrice.times(quantity).times(discount <= 1 && discount >= 0 ? 1 - discount : 1)
  }
}
