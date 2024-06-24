import { ArrowLeftOutlined } from '@ant-design/icons'
import { Row, Col, Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  navegateTo: string
}

export const PageHeader: React.FC<Props> = ({ title, navegateTo }) => {
  const navigate = useNavigate()
  return (
    <Row>
      <Col span={2}>
        <Button
          htmlType="button"
          onClick={() => navigate(navegateTo)}
          danger
          style={{ width: 'fit-content' }}
        >
          <ArrowLeftOutlined />
        </Button>
      </Col>
      <Col span={12} offset={4}>
        <Flex justify="center">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </Flex>
      </Col>
    </Row>
  )
}
