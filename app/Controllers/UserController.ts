import User from 'App/Models/User'
import UserRepository from 'App/Repository/UserRepository'
import UserValidator from 'App/Validator/UserValidator'
import CrudController from './Base/CrudController'

export default class UserController extends CrudController<
  UserValidator,
  User,
  UserRepository
>{

  constructor() {
    super(
      new UserValidator(),
      new User(),
      new UserRepository()
    )
  }

}
