import 'reflect-metadata'
import execa from 'execa'
import { configure } from 'japa'
import dotenv from 'dotenv'

import knex from 'knex'
import Orm from 'Start/orm'

async function runMigrations() {
  await execa('yarn', ['migration:run'], {
    stdio: 'inherit',
  })
  await Orm.init()
}

async function rollbackMigrations() {
  dotenv.config()

  const connectedDatabase = await knex({
    client: 'pg',
    connection: {
      host: `${process.env.PG_HOST}`,
      user: `${process.env.PG_USERNAME}`,
      database: `${process.env.PG_DATABASE}-${process.env.ENV}`,
      password: process.env.PG_PASSWORD,
    }
  })

  await connectedDatabase.raw('DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;')
}

configure({
  files: ['./test/**/*.ts'],
  before: [runMigrations],
  after: [rollbackMigrations],
})