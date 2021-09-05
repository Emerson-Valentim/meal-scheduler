import { Entity, OneToOne, Property, PrimaryKey } from '@mikro-orm/core';
import Establishment from './Establishment';

@Entity()
export default class User {

  @PrimaryKey()
  public id: number

  @Property()
  public cnpj: string

  @Property()
  public phone: string

  @Property()
  public password: string

  @OneToOne(() => Establishment, establishment => establishment.user, { owner: true, orphanRemoval: true })
  public establishment_id: Establishment
}