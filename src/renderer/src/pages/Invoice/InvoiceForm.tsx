import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Select, Space } from 'antd'
import { PageHeader } from '@renderer/components/PageHeader'
import { SubmitButton } from '@renderer/components/SubmitButton'
import useIpc from '@renderer/hooks/UseIpc'
const { RangePicker } = DatePicker

interface Client {
  name: string
  address: string
  phone: string
  uuid: string
}
interface ClientData {
  label: string
  value: string
}

export const InvoiceForm: React.FC = () => {
  const [clients, setClients] = useState<ClientData[]>([])

  const [form] = Form.useForm()

  const clientsToClientData = (clients: Client[]): ClientData[] =>
    clients.map((client) => ({
      label: client.name,
      value: client.uuid
    }))

  const handleClients = (_event, data: Client[]) => {
    setClients(clientsToClientData(data))
  }

  const { send } = useIpc('client:findAll:response', handleClients)

  useEffect(() => {
    send('client:findAll')
  }, [send])

  const handle = () => {
    const dates = form.getFieldValue('date')
    form.setFieldValue('endDate', `${dates[1].$y}-${dates[1].$M}-${dates[1].$D}`)
    console.log(dates[1])
  }

  return (
    <>
      <PageHeader title="Registrar nova nota" navegateTo="/" />
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        requiredMark="optional"
      >
        <Form.Item name="date" label="Intervalo da nota" rules={[{ required: true }]}>
          <RangePicker onChange={() => handle()} />
        </Form.Item>
        <Form.Item name="clientId" label="Cliente" rules={[{ required: true }]}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={clients}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} ipcChannel="invoice:create">
              Criar
            </SubmitButton>
            <Button htmlType="reset" danger>
              Apagar tudo
            </Button>
            <Button htmlType="button" onClick={() => console.log(form.getFieldsValue())} danger>
              aa
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
