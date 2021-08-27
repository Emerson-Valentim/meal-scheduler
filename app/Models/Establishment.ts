import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import Environment from './Environment'
import MenuItem from './MenuItem'
import Reservation from './Reservation'
import Schedule from './Schedule'

export enum Segmentation {
  PUB = 'pub',
  RESTAURANT = 'restaurant',
  BAKERY = 'bakery',
  CANDY_STORE = 'candy_store',
  OTHERS = 'others'
}

@Entity()
export default class Establishment {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column()
  public description: string

  @Column()
  public category: Segmentation

  @OneToOne(() => Schedule)
  @JoinColumn()
  public schedule: Schedule

  @OneToMany(() => MenuItem, menu => menu.establishment)
  public menu: MenuItem[]

  @OneToMany(() => Environment, environment => environment.establishment)
  public environment: Environment[]

  @OneToMany(() => Reservation, reservation => reservation.establishment)
  public reservation: Reservation[]

}