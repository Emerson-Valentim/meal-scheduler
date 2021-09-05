import { EntityRepository } from '@mikro-orm/knex'
import Environment from 'App/Models/Environment'

export default class EnvironmentRepository extends EntityRepository<Environment> {

}
