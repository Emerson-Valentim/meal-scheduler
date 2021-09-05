import { Entity, OneToOne, Property, PrimaryKey } from '@mikro-orm/core';
import UserRepository from 'App/Repository/UserRepository';
import Establishment from './Establishment';

@Entity({ customRepository: () => UserRepository})
export default class User {

  @PrimaryKey()
  public id: number

  @Property({ unique: true })
  public cnpj: string

  @Property()
  public phone: string

  @Property()
  public password: string

  @OneToOne(() => Establishment, establishment => establishment.user, {
    owner: true,
    orphanRemoval: true,
    nullable: true,
    fieldName: 'establishment_id'
  })
  public establishment_id: Establishment
}