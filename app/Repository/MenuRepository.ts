import MenuItem from 'App/Models/MenuItem';
import {EntityRepository, Repository} from 'typeorm';


@EntityRepository(MenuItem)
export default class MenuRepository extends Repository<MenuItem> {

}