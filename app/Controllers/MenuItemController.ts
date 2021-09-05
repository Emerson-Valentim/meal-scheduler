import MenuItem from 'App/Models/MenuItem'
import MenuItemValidator from 'App/Validator/MenuItemValidator'
import CrudController from './Base/CrudController'

export default class MenuItemController extends CrudController<
  MenuItemValidator,
  typeof MenuItem
>{

  constructor() {
    super(
      new MenuItemValidator(),
      MenuItem,
    )
  }

}
