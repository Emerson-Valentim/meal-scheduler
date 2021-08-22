const { join } = require('path')

console.log(join(__dirname, 'app', 'Models', '*.{ts,js}'))

module.exports = {
  'type': 'postgres',
  'host': 'postgres',
  'port': 5432,
  'username': 'postgres',
  'password': 'postgresihc',
  'database': 'meal-scheduler',
  'synchronize': true,
  'logging': false,
  'entities': [
    join(__dirname, 'app', 'Models', '*.{ts,js}')
  ],
  'migrations': [
    join(__dirname, 'config', 'database', 'migration', '*.{ts,js}')
  ],
  'subscribers': [
    join(__dirname, 'config', 'database', 'subscriber', '*.{ts,js}')
  ]
}