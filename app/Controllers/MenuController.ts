
import MenuItem from 'App/Models/MenuItem'
import MenuRepository from 'App/Repository/MenuRepository'
import MenuValidator from 'App/Validator/MenuValidator'
import CrudController from './Base/CrudController'

export default class MenuController extends CrudController<
  MenuValidator,
  MenuItem,
  MenuRepository
>{

  constructor() {
    super(
      new MenuValidator(),
      new MenuItem(),
      new MenuRepository()
    )
  }

}

