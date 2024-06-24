import { CustomFloatButtom } from '@renderer/components/CustomFloatButton'
import { PageHeader } from '@renderer/components/PageHeader'
import { Flex, Table, TableColumnsType, TableProps } from 'antd'
import { useEffect, useState } from 'react'

interface Operation {
  name: string
  type: string
  price: number
  uuid: string
}

export const OperationList = () => {
  const [operations, setOperations] = useState<Operation[]>([])

  const ipcHandle = (): void => window.electron.ipcRenderer.send('operation:findAll')

  useEffect(() => {
    window.electron.ipcRenderer.on('operation:findAll:response', (event, operations) => {
      console.log(1)
      if (operations.error) {
        console.error(operations.error)
      } else {
        setOperations(operations)
        console.log(operations)
      }
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('client:findAll:response')
    }
  }, [])

  useEffect(() => {
    ipcHandle()
  }, [])

  const columns: TableColumnsType<Operation> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    }
  ]

  const onChange: TableProps<Operation>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Flex gap="middle" vertical>
      <PageHeader title="Produtos e Serviços" navegateTo="/" />

      <Table
        columns={columns}
        dataSource={operations}
        rowKey={(record) => record.uuid}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
      <CustomFloatButtom path="/createOperation" />
    </Flex>
  )
}
