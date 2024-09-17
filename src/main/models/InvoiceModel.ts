import { v4 as uuidv4 } from 'uuid'
import Decimal from 'decimal.js'
import { InvoiceStatus } from './enums/InvoiceStatus'
import { Client } from './ClientModel'
import { FinancialRecord } from './FinancialRecordModel'

export class Invoice {
  uuid: string
  client: Client
  startDate: Date
  endDate: Date
  status: InvoiceStatus
  totalAmount: Decimal
  financialRecords: FinancialRecord[]

  constructor(
    client: Client,
    startDate: Date,
    endDate: Date,
    status?: InvoiceStatus,
    financialRecords?: FinancialRecord[],
    uuid?: string
  ) {
    this.uuid = uuid || uuidv4()
    this.client = client
    this.startDate = startDate
    this.endDate = endDate
    this.financialRecords = financialRecords || []
    this.totalAmount = this.calculateTotalAmount(this.financialRecords)
    this.status = status || InvoiceStatus.INCOMPLETE
  }

  private calculateTotalAmount(financialRecords: FinancialRecord[]): Decimal {
    this.totalAmount = financialRecords.reduce((acc, record) => {
      return acc.plus(record.totalPrice)
    }, new Decimal(0))
    return this.totalAmount
  }
}
