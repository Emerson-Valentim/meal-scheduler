import Environment from 'App/Models/Environment'
import EnvironmentValidator from 'App/Validator/EnvironmentValidator'

import CrudController from './Base/CrudController'

export default class EnvironmentController extends CrudController<
  EnvironmentValidator,
  typeof Environment
>{

  constructor() {
    super(
      new EnvironmentValidator(),
      Environment,
    )
  }

}
