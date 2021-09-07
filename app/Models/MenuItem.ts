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

  /**
   * @todo Add this field as monetary on database
   */
  @Property()
  public value: number

  @ManyToOne(() => Establishment, { fieldName: 'establishment_id' })
  public establishment: Establishment
}