
import MenuItem from 'App/Models/MenuItem'
import MenuItemRepository from 'App/Repository/MenuItemRepository'
import MenuItemValidator from 'App/Validator/MenuItemValidator'
import CrudController from './Base/CrudController'

export default class MenuItemController extends CrudController<
  MenuItemValidator,
  MenuItem,
  MenuItemRepository
>{

  constructor() {
    super(
      new MenuItemValidator(),
      new MenuItem(),
      new MenuItemRepository()
    )
  }

}

