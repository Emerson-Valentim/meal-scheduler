import Table from './Table'
import Establishment from './Establishment';
import { DateTime } from 'luxon';
import { Entity, ManyToOne, Property, PrimaryKey, Enum, EntityRepositoryType } from '@mikro-orm/core';
import ReservationRepository from 'App/Repository/ReservationRepository';

export enum ReservationStatus {
  SCHEDULED = 'scheduled',
  CANCELED = 'canceled',
  FINISHED = 'finished'
}

export type Interval = {
  start: DateTime
  end: DateTime
}

@Entity({ customRepository: () => ReservationRepository })
export default class Reservation {

  [EntityRepositoryType]?: ReservationRepository

  @PrimaryKey()
  public id: number

  @Property()
  public cpf: string

  @Property()
  public phone: string

  @Enum(() => ReservationStatus)
  public status: ReservationStatus

  @ManyToOne(() => Table, { fieldName: 'table_id' })
  public table: Table

  @ManyToOne(() => Establishment, { fieldName: 'establishment_id' })
  public establishment: Establishment

  @Property({ columnType: 'jsonb' })
  public interval: Interval

}