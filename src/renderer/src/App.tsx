function App(): JSX.Element {
  const testClient = (): void => window.electron.ipcRenderer.send('client')
  const testProduct = (): void => window.electron.ipcRenderer.send('product')
  const testService = (): void => window.electron.ipcRenderer.send('service')
  const testInvoice = (): void => window.electron.ipcRenderer.send('invoice')
  const testDatabase = (): void => window.electron.ipcRenderer.send('database')

  return (
    <>
      <div className="action">
        <a onClick={testClient}>Client</a>
      </div>
      <div className="action">
        <a onClick={testProduct}>Product</a>
      </div>
      <div className="action">
        <a onClick={testService}>Service</a>
      </div>
      <div className="action">
        <a onClick={testInvoice}>Service</a>
      </div>
      <div className="action">
        <a onClick={testDatabase}>Database</a>
      </div>
    </>
  )
}

export default App
