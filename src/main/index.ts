import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import prisma from './config/prisma'
import { ClientService } from './services/ClientService'
import { OperationService } from './services/OperationService'
import { FinancialRecordService } from './services/FinancialRecordService'
import { Client } from './models/ClientModel'
import { Operation } from './models/OperationModel'
import { OperationType } from './models/enums/OperationType'
import { FinancialRecord } from './models/FinancialRecordModel'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const clientService = new ClientService()
  const operationService = new OperationService()
  const financialRecordService = new FinancialRecordService()

  ipcMain.on('client:create', async (_event, data) => {
    console.log(data)
    const client = new Client(
      data.name,
      data.address || '',
      data.phone ? `${data.prefix} ${data.phone}` : ''
    )

    clientService.createClient(client)
  })

  ipcMain.on('operation:create', async (_event, data) => {
    console.log(data)
    const operation = new Operation(
      data.name,
      data.price,
      data.type === 'service' ? OperationType.SERVICE : OperationType.PRODUCT
    )

    operationService.createOperation(operation)
  })

  ipcMain.on('financialRecord:create', async (_event, data) => {
    const operation = await operationService.getOperationById(data.operationId)
    console.log(operation)
    const record = new FinancialRecord(
      new Date(`${data.date.$y}-${data.date.$M}-${data.date.$D}`),
      data.discount / 100,
      operation,
      data.quantity,
      '0'
    )

    financialRecordService.createFinancialRecord(record)
  })

  ipcMain.on('client:findAll', async (event) => {
    try {
      const clients = await clientService.getAllClients()
      event.reply('client:findAll:response', clients)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      event.reply('client:findAll:response', { error: 'Erro ao buscar clientes' })
    }
  })

  ipcMain.on('operation:findAll', async (event) => {
    try {
      const operations = await operationService.getAllOperations()
      event.reply(
        'operation:findAll:response',
        operations.map((operation) => operation.toDTO())
      )
    } catch (error) {
      console.error('Erro ao buscar operações:', error)
      event.reply('operation:findAll:response', { error: 'Erro ao buscar operações' })
    }
  })

  ipcMain.on('financialRecord:findAll', async (event) => {
    try {
      const financialRecords = await financialRecordService.getAllFinancialRecords()
      let financialRecordsDto = financialRecords.map((record) => record.toDTO())

      // Garante que o objeto é serializável antes de enviar
      let serializableRecordsDto = ensureSerializable(financialRecordsDto)
      event.reply('financialRecord:findAll:response', serializableRecordsDto)
    } catch (error) {
      console.error('Erro ao buscar registros financeiros:', error)
      event.reply('financialRecord:findAll:response', {
        error: 'Erro ao buscar registros financeiros'
      })
    }
  })

  function ensureSerializable(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  ipcMain.on('client&operation:findAll', async (event) => {
    try {
      const clients = await clientService.getAllClients()
      const operations = await operationService.getAllOperations()
      const operationDto = operations.map((operation) => operation.toDTO())
      event.reply('client&operation:findAll:response', {
        clients: clients,
        operations: operationDto
      })
    } catch (error) {
      console.error('Erro ao buscar clientes e operações:', error)
      event.reply('client&operation:findAll:response', {
        error: 'Erro ao buscar clientes e operações'
      })
    }
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await prisma.$disconnect()
    app.quit()
  }
})
