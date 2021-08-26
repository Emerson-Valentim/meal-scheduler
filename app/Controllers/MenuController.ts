
import Menu from 'App/Models/Menu'
import MenuRepository from 'App/Repository/MenuRepository'
import MenuValidator from 'App/Validator/MenuValidator'
import CrudController from './Base/CrudController'

export default class MenuController extends CrudController<
  MenuValidator,
  Menu,
  MenuRepository
>{

  constructor() {
    super(
      new MenuValidator(),
      new Menu(),
      new MenuRepository()
    )
  }

}

