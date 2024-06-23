import { PrismaClient } from '@prisma/client'
import { Invoice } from '../models/InvoiceModel'

const prisma = new PrismaClient()

export class InvoiceRepository {
  async create(invoice: Invoice) {
    return await prisma.invoice.create({
      data: {
        id: invoice.uuid,
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        status: invoice.status,
        totalAmount: invoice.totalAmount,
        clientId: invoice.client.uuid
      }
    })
  }

  async findAll() {
    return await prisma.invoice.findMany({
      include: {
        financialRecords: true,
        client: true
      }
    })
  }

  async findById(id: string) {
    return await prisma.invoice.findUnique({
      where: { id },
      include: {
        financialRecords: true,
        client: true
      }
    })
  }

  async update(invoice: Invoice) {
    return await prisma.invoice.update({
      where: { id: invoice.uuid },
      data: {
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        status: invoice.status,
        totalAmount: invoice.totalAmount,
        clientId: invoice.client.uuid
      }
    })
  }

  async delete(id: string) {
    return await prisma.invoice.delete({
      where: { id }
    })
  }
}
