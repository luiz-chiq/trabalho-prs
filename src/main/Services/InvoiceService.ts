import { InvoiceRepository } from '../repositories/InvoiceRepository'
import { FinancialRecordRepository } from '../repositories/FinancialRecordRepository'
import { Invoice } from '../models/InvoiceModel'
import { FinancialRecord } from '../models/FinancialRecordModel'

export class InvoiceService {
  private invoiceRepository: InvoiceRepository
  private financialRecordRepository: FinancialRecordRepository

  constructor() {
    this.invoiceRepository = new InvoiceRepository()
    this.financialRecordRepository = new FinancialRecordRepository()
  }

  async createInvoice(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepository.create(invoice)
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceRepository.findAll()
  }

  async getInvoiceById(uuid: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(uuid)
    if (!invoice) {
      throw new Error(`Invoice with UUID ${uuid} not found`)
    }
    return invoice
  }

  async updateInvoice(invoice: Invoice): Promise<Invoice> {
    const invoiceResult = await this.invoiceRepository.findById(invoice.uuid)
    if (!invoiceResult) throw new Error(`Invoice with UUID ${invoice.uuid} not found`)
    return this.invoiceRepository.update(invoice)
  }

  async deleteInvoice(uuid: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(uuid)
    if (!invoice) throw new Error(`Invoice with UUID ${uuid} not found`)
    return this.invoiceRepository.delete(uuid)
  }

  async addFinancialRecord(
    financialRecord: FinancialRecord,
    invoiceId: string
  ): Promise<FinancialRecord> {
    const invoice = await this.invoiceRepository.findById(invoiceId)
    if (!invoice) {
      throw new Error(`Invoice with UUID ${invoiceId} not found`)
    }
    financialRecord.invoiceId = invoiceId
    return this.financialRecordRepository.create(financialRecord)
  }
}
