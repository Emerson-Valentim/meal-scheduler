import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Environment from './Environment'
import Menu from './Menu'
import Table from './Table'

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

  @OneToMany(() => Menu, menu => menu.establishment)
  public menu: Menu[]

  @OneToMany(() => Environment, environment => environment.establishment)
  public environment: Environment[]

  @OneToMany(() => Table, table => table.establishment)
  public table: Table[]

}