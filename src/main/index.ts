import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import prisma from './config/prisma'
import { ClientService } from './Services/ClientService'
import { OperationService } from './Services/OperationService'
import { Client } from './models/ClientModel'
import { Operation } from './models/OperationModel'
import { OperationType } from './models/enums/OperationType'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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
