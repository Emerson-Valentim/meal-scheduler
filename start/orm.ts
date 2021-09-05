import HttpException from 'App/Exceptions/HttpException';
import config from '../database/mikro-orm.config';

import { MikroORM } from '@mikro-orm/core';
export default class Orm {

  public static instance: MikroORM

  public static async init() {
    try {
      Orm.instance = await MikroORM.init(config as any);
    } catch (error) {
      throw new HttpException('Error on database connection', 503, error)
    }
  }

}
