import { ReflectMetadataProvider } from '@mikro-orm/core';
import 'reflect-metadata';

export default {
  type: 'postgresql',
  entities: [
    process.env.REMOTE === 'true' ?
      './app/Models/*.ts' :
      './.build/app/Models/*.js'
  ],
  entitiesTs: [
    './app/Models/*.ts'
  ],
  migrations: {
    path: './database/migrations'
  },
  metadataProvider: ReflectMetadataProvider,
  clientUrl: `postgresql://${process.env.PG_USERNAME}@${process.env.PG_HOST}:5432`,
  dbName: `${process.env.PG_DATABASE}-${process.env.ENV}`,
  password: process.env.PG_PASSWORD,
}