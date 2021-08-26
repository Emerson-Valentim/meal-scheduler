import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Schedule {

  @PrimaryGeneratedColumn()
  public id: number

  @Column('jsonb')
  public definition: any
}