import { Entity, ManyToOne, Property, PrimaryKey } from '@mikro-orm/core';
import Establishment from './Establishment';

@Entity()
export default class MenuItem {

  @PrimaryKey()
  public id: number

  @Property()
  public name: string

  @Property()
  public ingredients: string

  @Property()
  public value: number

  @ManyToOne(() => Establishment, { mapToPk: true, fieldName: 'establishment_id' })
  public establishment: Establishment
}