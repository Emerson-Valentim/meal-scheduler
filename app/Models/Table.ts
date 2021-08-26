import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Environment from "./Environment";
import Reservation from "./Reservation";

@Entity()
export default class Table {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public identification: number 

  @Column()
  public seats: number

  @ManyToOne(() => Environment, environment => environment.table)
  public environment: Environment

  @OneToMany(() => Reservation, reservation => reservation.table)
  public reservation: Reservation[]

}