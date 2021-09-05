import User from 'App/Models/User'
import UserValidator from 'App/Validator/UserValidator'
import CrudController from './Base/CrudController'

export default class UserController extends CrudController<
  UserValidator,
  typeof User
>{

  constructor() {
    super(
      new UserValidator(),
      User,
    )
  }

}
