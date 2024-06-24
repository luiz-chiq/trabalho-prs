import { CustomFloatButtom } from '@renderer/components/CustomFloatButton'
import { PageHeader } from '@renderer/components/PageHeader'
import useIpc from '@renderer/hooks/UseIpc'
import { Flex, Table, TableColumnsType, TableProps } from 'antd'
import { useEffect, useState } from 'react'

interface Client {
  name: string
  address: string
  phone: string
  uuid: string
}

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([])

  const handleClients = (_event, clientsData: Client[]) => {
    setClients(clientsData)
  }

  const { send } = useIpc('client:findAll:response', handleClients)

  useEffect(() => {
    send('client:findAll')
  }, [send])

  const columns: TableColumnsType<Client> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      defaultSortOrder: 'descend'
    },
    {
      title: 'Endereço',
      dataIndex: 'address'
    }
  ]

  const onChange: TableProps<Client>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <Flex gap="middle" vertical>
      <PageHeader title="Clientes" navegateTo="/" />

      <Table
        columns={columns}
        dataSource={clients}
        rowKey={(record) => record.uuid}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
      <CustomFloatButtom path="/createClient" />
    </Flex>
  )
}
