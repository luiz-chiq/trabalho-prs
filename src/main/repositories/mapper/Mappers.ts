import { Client } from '../../models/ClientModel'

export const mapClient = (data: any): Client => {
  return new Client(data.name, data.address, data.phone, data.uuid)
}
