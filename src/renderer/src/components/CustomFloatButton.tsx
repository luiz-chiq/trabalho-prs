import { PlusOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import { useNavigate } from 'react-router-dom'

interface CustomFloatButtomProps {
  path: string
}

export const CustomFloatButtom: React.FC<CustomFloatButtomProps> = ({ path }) => {
  const navigate = useNavigate()
  return (
    <FloatButton
      shape="circle"
      type="primary"
      style={{ right: 50, bottom: 50, height: 45, width: 45 }}
      icon={<PlusOutlined />}
      onClick={() => navigate(path)}
    />
  )
}
