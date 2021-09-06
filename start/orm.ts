import { MikroORM } from '@mikro-orm/core';

import HttpException from 'App/Exceptions/HttpException';
import config from '../database/mikro-orm.config';
export default class Orm {

  public static em

  public static async init() {
    try {
      const orm = await MikroORM.init(config as any);
      Orm.em = orm.em
    } catch (error) {
      throw new HttpException('Error on database connection', 503, error)
    }
  }

}
