import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import { PageHeader } from '@renderer/components/PageHeader'
import { SubmitButton } from '@renderer/components/SubmitButton'
const { Option } = Select

export const ClientForm: React.FC = () => {
  const [form] = Form.useForm()

  const options: React.ReactNode[] = []

  for (let i = 1; i <= 99; i++) {
    options.push(
      <Option key={i} value={i < 10 ? `00${i}` : `0${i}`}>
        {i < 10 ? `00${i}` : `0${i}`}
      </Option>
    )
  }

  const prefixSelector = (
    <Form.Item name="prefix" initialValue={'016'} noStyle>
      <Select style={{ width: 70 }} defaultValue={'016'}>
        {options}
      </Select>
    </Form.Item>
  )

  return (
    <>
      <PageHeader title="Registrar novo cliente" navegateTo="/clients" />
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        requiredMark="optional"
      >
        <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Telefone">
          <Input addonBefore={prefixSelector} />
        </Form.Item>
        <Form.Item name="address" label="Endereço">
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} ipcChannel="client:create" navegateTo="/clients">
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
