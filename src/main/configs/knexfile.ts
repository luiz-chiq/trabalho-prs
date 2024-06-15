export const knexConfig = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './db.sqlite'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: './db.sqlite'
    },
    useNullAsDefault: true
  }
}
