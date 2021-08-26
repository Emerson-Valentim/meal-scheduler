import Menu from 'App/Models/Menu';
import {EntityRepository, Repository} from 'typeorm';


@EntityRepository(Menu)
export default class MenuRepository extends Repository<Menu> {

}