import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { CustomFloatButtom } from '@renderer/components/CustomFloatButton'
import { PageHeader } from '@renderer/components/PageHeader'
import useIpc from '@renderer/hooks/UseIpc'
import { Button, Col, Flex, Row, Table, TableColumnsType, TableProps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Client {
  name: string
  address: string
  phone: string
  uuid: string
}

export const ClientList = () => {
  const navigate = useNavigate()

  const [clients, setClients] = useState<Client[]>([])

  const handleClients = (_event, clientsData: Client[]) => {
    setClients(clientsData)
  }

  const { send } = useIpc('client:findAll:response', handleClients)

  // const ipcHandle = (): void => window.electron.ipcRenderer.send('client:findAll')

  // useEffect(() => {
  //   window.electron.ipcRenderer.on('client:findAll:response', (_event, clients) => {
  //     if (clients.error) {
  //       console.error(clients.error)
  //     } else {
  //       setClients(clients)
  //       console.log(clients)
  //     }
  //   })

  //   return () => {
  //     window.electron.ipcRenderer.removeAllListeners('client:findAll:response')
  //   }
  // }, [])

  useEffect(() => {
    // ipcHandle()
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
      //   sorter: (a, b) => a.phone.le - b.age
    },
    {
      title: 'Endereço',
      dataIndex: 'address'
      // onFilter: (value, record) => record.address.indexOf(value as string) === 0
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
      {/* <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 50, bottom: 50, height: 45, width: 45 }}
        icon={<PlusOutlined />}
        onClick={() => navigate('/createClient')}
      /> */}
      <CustomFloatButtom path="/createClient" />
    </Flex>
  )
}
