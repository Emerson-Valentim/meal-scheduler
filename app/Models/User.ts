import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Establishment from './Establishment';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public cnpj: string

  @Column()
  public phone: string

  @Column()
  public password: string

  @OneToOne(() => Establishment)
  @JoinColumn()
  public establishment: Establishment
}