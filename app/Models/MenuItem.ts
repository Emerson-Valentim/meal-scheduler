import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Establishment from "./Establishment";

@Entity()
export default class MenuItem {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @Column()
  public ingredients: string

  @Column()
  public value: number

  @ManyToOne(() => Establishment, establishment => establishment.menu)
  public establishment: Establishment
}