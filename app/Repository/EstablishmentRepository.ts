import Establishment from 'App/Models/Establishment';
import {EntityRepository, Repository} from 'typeorm';


@EntityRepository(Establishment)
export class EstablishmentRepository extends Repository<Establishment> {

}