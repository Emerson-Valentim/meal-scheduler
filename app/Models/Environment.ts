import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Establishment from "./Establishment";

export enum EnvironmentLocation {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
}

@Entity()
export default class Environment {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public smoking_allowed: boolean

  @Column()
  public pets_allowed: boolean

  @Column()
  public location: EnvironmentLocation

  @Column()
  public description: string

  @ManyToOne(() => Establishment, establishment => establishment.environment)
  public establishment: Establishment
}