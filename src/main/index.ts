import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { Client } from './models/ClientModel'
import Decimal from 'decimal.js'
import { Invoice } from './models/InvoiceModel'
import { PrismaClient } from '@prisma/client'
import { ClientRepository } from './repositories/ClientRepository'
// import { Model } from 'objection'
// import Knex from 'knex'
// import { knexConfig } from '../main/configs/knexfile'
// import { createTables } from './configs/migrations'
// import ClientRepository from './repositories/Client/ClientRepository'

// const environment = process.env.NODE_ENV || 'development'
// const knex = Knex(knexConfig[environment])

let i = 0

const prisma = new PrismaClient()
// Model.knex(knex)
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

app.whenReady().then(async () => {
  await prisma.$connect()
  // try {
  // await createTables(knex)

  // } catch (err) {
  //   console.error('Error creating tables:', err)
  // }

  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  let clientRepository = new ClientRepository()
  ipcMain.on('client', async () => {
    // await prisma.$connect()
    let a = new Client('luiz', 'a', '123', null)
    i++

    clientRepository.create(a)

    // await prisma.$disconnect()
    // ClientRepository.create(a)
  })

  ipcMain.on('product', async () => {
    console.log(await clientRepository.findAll())
    // try {
    //   const clients = await prisma.client.findMany()
    //   console.log(clients)
    // } catch (error) {
    //   console.error('Error fetching clients:', error)
    //   throw error
    // }
    // console.log(new Product('a', new Decimal(4), 3))
  })

  let a: Invoice

  ipcMain.on('invoice', () => {
    // a = new Invoice(new Date('01-01-2024'), new Date('02-01-2024'))
    console.log(a)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    app.on('before-quit', async (event) => {
      // try {
      //   // await knex.destroy()
      //   console.log('Database connection closed.')
      // } catch (err) {
      //   console.error('Error closing database connection:', err)
      // }
    })
  }
})

app.on('will-quit', async () => {
  await prisma.$disconnect()
})
