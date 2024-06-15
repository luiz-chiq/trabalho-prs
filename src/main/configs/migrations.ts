// const Knex = require('knex')

// Função para criar as tabelas
export async function createTables(knex) {
  await knex.schema.createTable('clients', (table) => {
    table.uuid('uuid').primary()
    table.string('name').notNullable()
    table.string('address').notNullable()
    table.string('phone').notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.decimal('unitPrice', 10, 2).notNullable()
    table.integer('quantity').notNullable()
    table.decimal('totalPrice', 10, 2).notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable('services', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.decimal('totalPrice', 10, 2).notNullable()
    table.date('startDate').notNullable()
    table.date('endDate')
    table.timestamps(true, true)
  })

  await knex.schema.createTable('invoices', (table) => {
    table.uuid('id').primary()
    table.uuid('client_id').references('uuid').inTable('clients').onDelete('CASCADE').notNullable()
    table.date('startPeriod').notNullable()
    table.date('endPeriod').notNullable()
    table.decimal('totalAmount', 10, 2).notNullable()
    table.enu('status', ['Paid', 'Partialy paid', 'Pending', 'Incomplete']).notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable('financial_records', (table) => {
    table.uuid('id').primary()
    table.date('date').notNullable()
    table.decimal('totalPrice', 10, 2).notNullable()
    table.integer('discount').notNullable()
    table
      .uuid('operation_id')
      .references('id')
      .inTable('operations')
      .onDelete('CASCADE')
      .notNullable()
    table.uuid('invoice_id').references('id').inTable('invoices').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}
