import { Button, Flex, Typography } from 'antd'
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ClientForm } from './pages/Client/ClientForm'
import { ClientList } from './pages/Client/ClientList'

const Menu: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Flex gap="middle" vertical style={{ width: '200px' }} justify="center" align="center">
        <Typography.Title level={3}>Menu</Typography.Title>
        <Button htmlType="button" onClick={() => navigate('/clients')}>
          Listar clientes
        </Button>
      </Flex>
    </div>
  )
}

export function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/createClient" element={<ClientForm />} />
        <Route path="/clients" element={<ClientList />} />
      </Routes>
    </Router>
  )
}
