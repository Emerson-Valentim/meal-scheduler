import { Collection, Entity, ManyToOne, OneToMany, Property, PrimaryKey } from '@mikro-orm/core';
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

  @Property()
  public location: EnvironmentLocation

  @Property()
  public description: string

  @ManyToOne(() => Establishment)
  public establishment_id: Establishment

  @OneToMany('Table', 'environment_id')
  public tables = new Collection<Table>(this)

}