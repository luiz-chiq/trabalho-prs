import React from 'react'
import type { FormInstance } from 'antd'
import { Button, Form } from 'antd'
import useIpc from '@renderer/hooks/UseIpc'

interface SubmitButtonProps {
  form: FormInstance
  ipcChannel: string
}

export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  ipcChannel,
  children
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false)

  const { send } = useIpc()

  const values = Form.useWatch([], form)

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, values])

  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => send(ipcChannel, form.getFieldsValue())}
      disabled={!submittable}
    >
      {children}
    </Button>
  )
}
