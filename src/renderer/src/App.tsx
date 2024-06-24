import { Flex, Typography } from 'antd'
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'

const Menu: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Flex gap="middle" vertical style={{ width: '200px' }} justify="center" align="center">
        <Typography.Title level={3}>Menu</Typography.Title>
      </Flex>
    </div>
  )
}

export function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  )
}
