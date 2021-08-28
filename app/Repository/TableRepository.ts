import Table from 'App/Models/Table';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Table)
export default class TableRepository extends Repository<Table> {

}