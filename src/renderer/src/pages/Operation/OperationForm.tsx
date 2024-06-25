import React from 'react'
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd'
import { PageHeader } from '@renderer/components/PageHeader'
import { SubmitButton } from '@renderer/components/SubmitButton'

export const OperationForm: React.FC = () => {
  const [form] = Form.useForm()

  return (
    <>
      <PageHeader title="Registrar novo produto ou serviço" navegateTo="/operations" />
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
        <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="service"> Serviço </Radio>
            <Radio value="product"> Produto </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="price" label="Preço" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} ipcChannel="operation:create">
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
