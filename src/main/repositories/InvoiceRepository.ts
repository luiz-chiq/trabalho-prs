import { Invoice } from '../models/InvoiceModel'
import { mapInvoice } from './mapper/Mappers'
import prisma from '../config/prisma'

export class InvoiceRepository {
  async create(invoice: Invoice): Promise<Invoice> {
    const result = await prisma.invoice.create({
      data: {
        uuid: invoice.uuid,
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        status: invoice.status,
        totalAmount: invoice.totalAmount,
        clientId: invoice.client.uuid
      }
    })
    return mapInvoice(result)
  }

  async findAll() {
    const result = await prisma.invoice.findMany({
      include: {
        financialRecords: true,
        client: true
      }
    })
    return result.map(mapInvoice)
  }

  async findById(uuid: string): Promise<Invoice | null> {
    const result = await prisma.invoice.findUnique({
      where: { uuid: uuid },
      include: {
        financialRecords: true,
        client: true
      }
    })
    return mapInvoice(result)
  }

  async update(invoice: Invoice): Promise<Invoice> {
    const result = await prisma.invoice.update({
      where: { uuid: invoice.uuid },
      data: {
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        status: invoice.status,
        totalAmount: invoice.totalAmount,
        clientId: invoice.client.uuid
      }
    })
    return mapInvoice(result)
  }

  async delete(uuid: string): Promise<Invoice> {
    const result = await prisma.invoice.delete({
      where: { uuid: uuid }
    })
    return mapInvoice(result)
  }
}
