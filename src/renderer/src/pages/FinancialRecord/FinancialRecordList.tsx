import { CustomFloatButtom } from '@renderer/components/CustomFloatButton'
import { PageHeader } from '@renderer/components/PageHeader'
import useIpc from '@renderer/hooks/UseIpc'
import { Table, TableColumnsType, TableProps } from 'antd'
import { useEffect, useState } from 'react'

interface FinancialRecord {
  uuid: string
  operationName: string
  operationType: 'product' | 'service'
  date: string
  unitPrice: number
  quantity: number
  discount: number
  totalPrice: number
  invoiceId: string
  operationId: string
}

export const FinancialRecordList: React.FC = () => {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([])

  const handleFinancialRecord = (_event, data: FinancialRecord[]) => {
    setFinancialRecords(data)
  }

  const { send } = useIpc('client:findAll:response', handleFinancialRecord)

  useEffect(() => {
    send('financialRecord:findAll')
  }, [send])

  const columns: TableColumnsType<FinancialRecord> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.operationName.indexOf(value as string) === 0,
      sorter: (a, b) => a.operationName.length - b.operationName.length,
      defaultSortOrder: 'descend',
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tipo',
      dataIndex: 'operationType',
      sorter: (a, b) => a.operationType.length - b.operationType.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Preço unitário',
      dataIndex: 'unitPrice',
      sorter: (a, b) => a.unitPrice - b.unitPrice,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Desconto',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Preço final',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ['descend', 'ascend']
    }
  ]

  const onChange: TableProps<FinancialRecord>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <>
      <PageHeader title="Registros" navegateTo="/"></PageHeader>
      <Table
        columns={columns}
        dataSource={financialRecords}
        rowKey={(record) => record.uuid}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
      <CustomFloatButtom path="/createFinancialRecords" />
    </>
  )
}
