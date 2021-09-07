import { Collection, Entity, ManyToOne, OneToMany, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import Establishment from './Establishment';
import Table from './Table';

export enum EnvironmentLocation {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
}

@Entity()
export default class Environment {

  @PrimaryKey()
  public id: number

  @Property()
  public smoking_allowed: boolean

  @Property()
  public pets_allowed: boolean

  @Enum(() => EnvironmentLocation)
  public location: EnvironmentLocation

  @Property()
  public description: string

  @ManyToOne(() => Establishment, { fieldName: 'establishment_id'})
  public establishment: Establishment

  @OneToMany('Table', 'environment')
  public tables = new Collection<Table>(this)

}