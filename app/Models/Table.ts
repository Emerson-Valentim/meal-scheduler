import { Collection, Entity, ManyToOne, OneToMany, Property, PrimaryKey } from '@mikro-orm/core';
import Environment from './Environment';
import Reservation from './Reservation';

@Entity()
export default class Table {

  @PrimaryKey()
  public id: number

  @Property()
  public identification: number

  @Property()
  public seats: number

  @ManyToOne(() => Environment, { mapToPk: true })
  public environment_id: Environment

  @OneToMany('Reservation', 'table_id')
  public reservation = new Collection<Reservation>(this)

}