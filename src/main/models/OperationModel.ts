import { v4 as uuidv4 } from 'uuid'
import { Decimal } from 'decimal.js'
import { OperationType } from './enums/OperationType'

interface OperationDTO {
  name: string
  uuid: string
  price: string
  type: OperationType
}

export class Operation {
  name: string
  uuid: string
  price: Decimal
  type: OperationType

  constructor(name: string, price: Decimal, type: OperationType, uuid?: string) {
    this.uuid = uuid || uuidv4()
    this.name = name
    this.price = price
    this.type = type
  }

  toDTO(): OperationDTO {
    return {
      name: this.name,
      uuid: this.uuid,
      price: this.price.toString(),
      type: this.type
    }
  }

  static fromDTO(dto: OperationDTO): Operation {
    return new Operation(dto.name, new Decimal(dto.price), dto.type, dto.uuid)
  }
}
