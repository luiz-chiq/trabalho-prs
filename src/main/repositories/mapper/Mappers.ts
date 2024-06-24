import Decimal from 'decimal.js'
import { Client } from '../../models/ClientModel'
import { Operation } from '../../models/OperationModel'
import { OperationType } from '../../models/enums/OperationType'

export const mapClient = (data: any): Client => {
  return new Client(data.name, data.address, data.phone, data.uuid)
}

export const mapOperation = (data: any): Operation => {
  return new Operation(data.name, new Decimal(data.price), data.type as OperationType, data.uuid)
}
