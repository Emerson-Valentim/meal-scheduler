import { Collection, Entity, OneToMany, Property, PrimaryKey, OneToOne } from '@mikro-orm/core'
import Environment from './Environment'
import MenuItem from './MenuItem'
import Reservation from './Reservation'
import Schedule from './Schedule'
import User from './User'

export enum Segmentation {
  PUB = 'pub',
  RESTAURANT = 'restaurant',
  BAKERY = 'bakery',
  CANDY_STORE = 'candy_store',
  OTHERS = 'others'
}

@Entity()
export default class Establishment {

  @PrimaryKey()
  public id: number

  @Property()
  public name: string

  @Property()
  public description: string

  @Property()
  public category: Segmentation

  @OneToOne({ mappedBy: 'establishment_id' })
  public schedule_id: Schedule

  @OneToOne({ mappedBy: 'establishment_id' })
  public user: User

  @OneToMany('MenuItem', 'establishment_id')
  public menu_items = new Collection<MenuItem>(this)

  @OneToMany('Environment', 'establishment_id')
  public environments = new Collection<Environment>(this)

  @OneToMany('Reservation', 'establishment_id')
  public reservations = new Collection<Reservation>(this)

}