const { join } = require('path')

module.exports = {
  'type': 'postgres',
  'host': process.env.PG_HOST,
  'port': 5432,
  'username': process.env.PG_USERNAME,
  'password': process.env.PG_PASSWORD,
  'database': process.env.PG_DATABASE,
  'synchronize': true,
  'logging': false,
  'entities': [
    `${process.env.ENV === 'local'
      ? join(__dirname, '.build', 'app', 'Models', '*.{ts,js}') 
      : join(__dirname, 'app', 'Models', '*.{ts,js}')}`
  ],
  'migrations': [
    `${process.env.ENV === 'local'
      ? join(__dirname, '.build', 'config', 'database', 'migration', '*.{ts,js}')
      : join(__dirname, 'config', 'database', 'migration', '*.{ts,js}')}`
  ],
  'subscribers': [
    `${process.env.ENV === 'local'
      ? join(__dirname, '.build', 'config', 'database', 'subscriber', '*.{ts,js}') 
      : join(__dirname, 'config', 'database', 'subscriber', '*.{ts,js}')}`
  ]
}