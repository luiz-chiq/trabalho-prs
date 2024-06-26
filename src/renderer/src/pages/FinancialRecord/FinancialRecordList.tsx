import { CustomFloatButtom } from '@renderer/components/CustomFloatButton'
import { PageHeader } from '@renderer/components/PageHeader'
import useIpc from '@renderer/hooks/UseIpc'
import { Table, TableColumnsType, TableProps } from 'antd'
import { useEffect, useState } from 'react'

interface FinancialRecord {
  date: string
  discount: number
  operationId: string
  operationName: string
  operationType: 'Product' | 'Service'
  quantity: number
  totalPrice: number
  invoiceId: string
  unitPrice: number
  uuid: string
}

export const FinancialRecordList: React.FC = () => {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([])

  const handleFinancialRecord = (_event, data) => {
    console.log(data)
    console.log(JSON.parse(data))
    setFinancialRecords(JSON.parse(data))
  }

  console.log(new Date('2023-03-10').toLocaleDateString())

  const { send } = useIpc('financialRecord:findAll:response', handleFinancialRecord)

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
      title: 'Data',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
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
