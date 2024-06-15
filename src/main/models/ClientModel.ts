import { v4 as uuidv4 } from 'uuid'

export class Client {
  uuid: string
  name: string
  nickname: string | null
  address: string
  phone: string

  constructor(name: string, address: string, phone: string, nickname: string | null, id?: string) {
    this.uuid = id || uuidv4()
    this.name = name
    this.nickname = nickname
    this.address = address
    this.phone = phone
  }
}
