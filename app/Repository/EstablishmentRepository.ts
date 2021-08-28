import Establishment from 'App/Models/Establishment';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Establishment)
export default class EstablishmentRepository extends Repository<Establishment> {

}