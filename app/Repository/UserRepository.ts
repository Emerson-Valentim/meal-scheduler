import User from 'App/Models/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

}