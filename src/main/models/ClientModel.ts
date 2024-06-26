import { v4 as uuidv4 } from 'uuid'

export class Client {
  uuid: string
  name: string
  address: string
  phone: string

  constructor(name: string, address: string, phone: string, uuid?: string) {
    this.uuid = uuid || uuidv4()
    this.name = name
    this.address = address
    this.phone = phone
  }
}
