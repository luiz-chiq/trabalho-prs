import { PageHeader } from '@renderer/components/PageHeader'
import { SubmitButton } from '@renderer/components/SubmitButton'
import useIpc from '@renderer/hooks/UseIpc'
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space
} from 'antd'
import React, { useEffect, useState } from 'react'

interface Client {
  name: string
  address: string
  phone: string
  uuid: string
}

interface Operation {
  name: string
  price: string
  type: string
  uuid: string
}

type OperationType = 'product' | 'service'

export const FinancialRecordForm: React.FC = () => {
  const [form] = Form.useForm()

  const [operationType, setOperatioType] = useState<OperationType>('service')

  const [clients, setClients] = useState<{ label: string; value: string }[]>([])

  const [operations, setOperations] = useState<{ label: string; value: string; type: string }[]>([])

  const ipcHandle = (): void => window.electron.ipcRenderer.send('client&operation:findAll')

  useEffect(() => {
    window.electron.ipcRenderer.on('client&operation:findAll:response', (event, data) => {
      if (data.error) {
        console.error(data.error)
      } else {
        setOperations(
          data.operations.map((obj) => ({ label: obj.name, value: obj.uuid, type: obj.type }))
        )
        setClients(data.clients.map((obj) => ({ label: obj.name, value: obj.uuid })))
        console.log(operations, 'o')
        console.log(clients, 'c')
      }
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('client&operation:findAll:response')
    }
  }, [])

  useEffect(() => {
    ipcHandle()
  }, [])

  const handleOperationTypeChange = (type: OperationType) => {
    setOperatioType(type)
    form.setFieldValue('operation', '')
  }

  const handleValuesChange = (changedValues, allValues) => {
    if (
      'quantity' in changedValues &&
      (changedValues.quantity === undefined || changedValues.quantity === null)
    ) {
      form.setFieldsValue({ quantity: 1 })
    }
    if (
      'discount' in changedValues &&
      (changedValues.discount === undefined || changedValues.discount === null)
    ) {
      form.setFieldsValue({ discount: 0 })
    }
  }

  return (
    <>
      <PageHeader title="Registrar venda ou serviço" navegateTo="/financialRecords" />
      <Form
        layout="vertical"
        autoComplete="off"
        requiredMark="optional"
        onValuesChange={handleValuesChange}
        form={form}
        initialValues={{ quantity: 1, discount: 0 }}
      >
        <Form.Item label="Tipo" required>
          <Radio.Group
            defaultValue={'service'}
            onChange={(value) => {
              handleOperationTypeChange(value.target.value)
            }}
          >
            <Radio.Button value="service">Serviço</Radio.Button>
            <Radio.Button value="product">Produto</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Data" name="date" rules={[{ required: true }]}>
          <DatePicker placeholder="Selecione a data" format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item label="Quantidade" name="quantity">
          <InputNumber<number> min={1} defaultValue={1} />
        </Form.Item>
        <Form.Item label="Desconto" name="discount">
          <InputNumber<number>
            defaultValue={0}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace('%', '') as unknown as number}
          />
        </Form.Item>
        <Form.Item label="Cliente" name="clientId" rules={[{ required: true }]}>
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
        <Form.Item
          label={operationType == 'service' ? 'Serviço' : 'Produto'}
          name="operationId"
          rules={[{ required: true }]}
        >
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
            options={operations.filter((obj) => obj.type.toLowerCase() === operationType)}
          />
        </Form.Item>
        <Form.Item label="Descrição" name="name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={() => console.log(form.getFieldsValue())}>aaa</Button>
            <SubmitButton form={form} ipcChannel="financialRecord:create" navegateTo="/financialRecords">
              Criar
            </SubmitButton>
            <Button htmlType="reset" danger>
              Apagar tudo
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
