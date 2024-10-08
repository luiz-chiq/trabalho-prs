import React, { PropsWithChildren, useEffect, useState } from 'react'
import type { FormInstance } from 'antd'
import { Button, Form } from 'antd'
import useIpc from '@renderer/hooks/UseIpc'
import { useNavigate } from 'react-router-dom'

interface SubmitButtonProps {
  form: FormInstance
  ipcChannel: string
  navegateTo?: string
}

export const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  form,
  ipcChannel,
  navegateTo,
  children
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false)
  const navigate = useNavigate()

  const { send } = useIpc()

  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, values])


  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => {send(ipcChannel, form.getFieldsValue());
        if (navegateTo) navigate(navegateTo)
      }}
      disabled={!submittable}
    >
      {children}
    </Button>
  )
}
