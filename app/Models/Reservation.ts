import Table from './Table'
import Establishment from './Establishment';
import { DateTime } from 'luxon';
import {
  Entity,
  ManyToOne,
  Property,
  PrimaryKey,
  Enum,
  EntityRepositoryType,
  BeforeCreate,
  EventArgs,
  BeforeUpdate
} from '@mikro-orm/core';
import ReservationRepository from 'App/Repository/ReservationRepository';
import { ReservationHook } from 'App/Hooks/ReservationHook';

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

  @BeforeCreate()
  public async beforeCreate({ entity: reservation }: EventArgs<this>) {
    ReservationHook.setIntervalUTC(reservation)
  }

  @BeforeUpdate()
  public async beforeUpdate({ entity: reservation }: EventArgs<this>) {
    ReservationHook.setIntervalUTC(reservation)
  }

}