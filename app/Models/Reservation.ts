import Table from './Table'
import Establishment from './Establishment';
import { DateTime } from 'luxon';
import { Entity, ManyToOne, Property, PrimaryKey } from '@mikro-orm/core';

export enum ReservationStatus {
  SCHEDULED = 'scheduled',
  CANCELED = 'canceled',
  FINISHED = 'finished'
}

export type Interval = {
  start: DateTime
  end: DateTime
}

@Entity()
export default class Reservation {

  @PrimaryKey()
  public id: number

  @Property()
  public cpf: string

  @Property()
  public phone: string

  @Property()
  public status: ReservationStatus

  @ManyToOne(() => Table, { mapToPk: true, fieldName: 'table_id' })
  public table_id: Table

  @ManyToOne(() => Establishment, { mapToPk: true, fieldName: 'establishment_id' })
  public establishment_id: Establishment

  @Property()
  public interval: Interval

}