import { v4 as uuidv4 } from 'uuid'
import { Decimal } from 'decimal.js'
import { OperationType } from './enums/OperationType'

export class Operation {
  name: string
  id: string
  price: Decimal
  type: OperationType

  constructor(name: string, price: Decimal, type: OperationType, id?: string) {
    this.id = id || uuidv4()
    this.name = name
    this.price = price
    this.type = type
  }
}
