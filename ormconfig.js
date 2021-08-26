const { join } = require('path')
const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

module.exports = {
  'type': 'postgres',
  'host': process.env.PG_HOST,
  'port': 5432,
  'username': process.env.PG_USERNAME,
  'password': process.env.PG_PASSWORD,
  'database': process.env.PG_DATABASE,
  'synchronize': false,
  'logging': false,
  'namingStrategy': new SnakeNamingStrategy(),
  'entities': [
    generateEntityDir()
  ],
  'migrations': [
    generateMigrationDir()
  ],
  'subscribers': [
    generateSubscriberDir()
  ],
  'cli': {
    'migrationsDir': generateMigrationDir('cli')
  }
}

function generateMigrationDir(mode = '') {
  if(mode === 'cli') {
    return join(__dirname, 'database', 'migration')
  }
  return process.env.ENV === 'local' && process.env.RUN_MIGRATION === 'false'
    ? join(__dirname, '.build', 'database', 'migration', '*.{ts,js}')
    : join(__dirname, 'database', 'migration', '*.{ts,js}')
}

function generateSubscriberDir() {
  return process.env.ENV === 'local'
    ? join(__dirname, '.build', 'database', 'subscriber', '*.{ts,js}') 
    : join(__dirname, 'database', 'subscriber', '*.{ts,js}')
}

function generateEntityDir() {
  return process.env.ENV === 'local'
    ? join(__dirname, '.build', 'app', 'Models', '*.{ts,js}') 
    : join(__dirname, 'app', 'Models', '*.{ts,js}')
}