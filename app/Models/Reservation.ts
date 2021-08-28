import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Table from 'App/Models/Table'
import Establishment from './Establishment';
import { DateTime } from 'luxon';

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

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public cpf: string

  @Column()
  public phone: string

  @Column()
  public status: ReservationStatus

  @ManyToOne(() => Table, table => table.reservation)
  public table: Table

  @ManyToOne(() => Establishment, establishment => establishment.reservation)
  public establishment: Establishment

  @Column('jsonb')
  public interval: Interval

}