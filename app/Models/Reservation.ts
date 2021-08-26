import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Table from 'App/Models/Table'
import Establishment from "./Establishment";

export enum ReservationStatus {
  scheduled = 'SCHEDULED',
  canceled = 'CANCELED',
  finished = 'FINISHED'
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

}