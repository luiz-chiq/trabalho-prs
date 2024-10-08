import { Button, Flex, Typography } from 'antd'
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ClientForm } from './pages/client/ClientForm'
import { ClientList } from './pages/client/ClientList'
import { OperationForm } from './pages/operation/OperationForm'
import { OperationList } from './pages/operation/OperationList'
import { FinancialRecordList } from './pages/financialRecord/FinancialRecordList'
import { FinancialRecordForm } from './pages/financialRecord/FinancialRecordForm'

const Menu: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Flex
        style={{ width: '100%', height: '90vh' }}
        gap="middle"
        vertical
        justify="center"
        align="center"
      >
        <Typography.Title level={3}>Menu</Typography.Title>
        <Button htmlType="button" onClick={() => navigate('/clients')} style={{ width: 200 }}>
          Listar clientes
        </Button>
        <Button htmlType="button" onClick={() => navigate('/operations')} style={{ width: 200 }}>
          Listar serviço e produtos
        </Button>
        <Button
          htmlType="button"
          onClick={() => navigate('/financialRecords')}
          style={{ width: 200 }}
        >
          Listar registros
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
        <Route path="/createOperation" element={<OperationForm />} />
        <Route path="/operations" element={<OperationList />} />
        <Route path="/financialRecords" element={<FinancialRecordList />} />
        <Route path="/createFinancialRecords" element={<FinancialRecordForm />} />
      </Routes>
    </Router>
  )
}
