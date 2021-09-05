import { EntityCaseNamingStrategy, ReflectMetadataProvider } from '@mikro-orm/core';
import 'reflect-metadata';

export default {
  type: 'postgresql',
  entities: ['./app/Models/*.ts'],
  migrations: {
    path: './database/migrations'
  },
  namingStrategy: EntityCaseNamingStrategy,
  metadataProvider: ReflectMetadataProvider,
  clientUrl: `postgresql://${process.env.PG_USERNAME}@${process.env.PG_HOST}:5432`,
  dbName: `${process.env.PG_DATABASE}-${process.env.ENV}`,
  password: process.env.PG_PASSWORD,
}