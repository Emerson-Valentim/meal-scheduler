import { EntityRepository } from '@mikro-orm/knex'
import Reservation from 'App/Models/Reservation'

export default class ReservationRepository extends EntityRepository<Reservation> {

}
