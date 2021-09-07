import { EntityRepository } from '@mikro-orm/knex'
import Reservation from 'App/Models/Reservation'
import { DateTime } from 'luxon'

export interface ConcurrentReservation {
  table_id: number,
  establishment_id: number,
  start: DateTime,
  end: DateTime
}
export default class ReservationRepository extends EntityRepository<Reservation> {

  public findConcurrent(filter: ConcurrentReservation) {
    return this
      .createQueryBuilder()
      .raw(`
      select 
        * 
      from ( 
        select 
          extract(epoch from ("interval"->'start')::text::timestamptz) * 1000 as "start", 
          extract(epoch from ("interval"->'end')::text::timestamptz) * 1000 as "end" 
        from reservation r 
        where r.status = 'scheduled'
        ) as "json_time"
      where 
        ${filter.start.toMillis()} between "json_time"."start" and "json_time"."end"
        or
        ${filter.end.toMillis()} between "json_time"."start" and "json_time"."end"
      `)
  }
}
