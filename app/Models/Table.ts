import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Establishment from "./Establishment";

@Entity()
export default class Table {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public identification: number 

  @Column()
  public seats: number

  @ManyToOne(() => Establishment, establishment => establishment.table)
  public establishment: Establishment

}