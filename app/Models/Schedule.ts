import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WeekDays {
  MONDAY = 0,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export type HourInterval = {
  start: string
  end: string
}

export type Week = {
  [key in WeekDays]?: HourInterval
}

@Entity()
export default class Schedule {

  @PrimaryGeneratedColumn()
  public id: number

  @Column('jsonb')
  public definition: Week
}