import React from 'react'
import type { FormInstance } from 'antd'
import { Button, Form, Input, InputNumber, Radio, Select, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageHeader } from '@renderer/components/PageHeader'
const { Option } = Select

interface SubmitButtonProps {
  form: FormInstance
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false)

  const ipcHandle = (): void =>
    window.electron.ipcRenderer.send('operation:create', form.getFieldsValue())

  const values = Form.useWatch([], form)

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))

    console.log(form.getFieldsValue())
  }, [form, values])

  return (
    <Button type="primary" htmlType="button" onClick={ipcHandle} disabled={!submittable}>
      {children}
    </Button>
  )
}

export const OperationForm: React.FC = () => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

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
            <SubmitButton form={form}>Criar</SubmitButton>
            <Button htmlType="reset" danger>
              Apagar tudo
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
