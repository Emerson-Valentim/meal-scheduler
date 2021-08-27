import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Schedule {

  @PrimaryGeneratedColumn()
  public id: number

  /**
   * @todo
   * Add interval type
   * week days
   * date
   */
  @Column('jsonb')
  public definition: any
}