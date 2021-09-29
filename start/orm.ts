import { Connection, EntityManager, IDatabaseDriver, MikroORM } from '@mikro-orm/core';

import HttpException from 'App/Exceptions/HttpException';
import config from '../database/mikro-orm.config';
export default class Orm {

  public static em: EntityManager<IDatabaseDriver<Connection>>

  public static async init() {
    try {
      const orm = await MikroORM.init(config as any);
      Orm.em = orm.em
    } catch (error) {
      throw new HttpException('Error on database connection', 503, error)
    }
  }

  public static async close() {
    try {
      await this.em.getConnection().close();
    } catch (error) {
      throw new HttpException('Error on database disconnection', 503, error)
    }
  }

}
