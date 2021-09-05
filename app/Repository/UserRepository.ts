import { EntityRepository } from '@mikro-orm/knex'
import User from 'App/Models/User'

export default class UserRepository extends EntityRepository<User> {

}
