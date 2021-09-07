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

  @ManyToOne(() => Environment, { fieldName: 'environment_id' })
  public environment: Environment

  @OneToMany('Reservation', 'table')
  public reservation = new Collection<Reservation>(this)

}