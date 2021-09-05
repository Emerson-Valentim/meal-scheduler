import HttpException from 'App/Exceptions/HttpException';
import config from '../database/mikro-orm.config';

import { MikroORM } from '@mikro-orm/core';
export default class Orm {
  public static async init() {
    try {
      await MikroORM.init(config as any);
    } catch (error) {
      throw new HttpException('Error on database connection', 503, error)
    }
  }
}