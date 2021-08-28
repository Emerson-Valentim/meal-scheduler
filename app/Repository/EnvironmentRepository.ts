import Environment from 'App/Models/Environment';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Environment)
export default class EnvironmentRepository extends Repository<Environment> {

}