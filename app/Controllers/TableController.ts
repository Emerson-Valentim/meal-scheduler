
import Table from 'App/Models/Table'
import TableRepository from 'App/Repository/TableRepository'
import TableValidator from 'App/Validator/TableValidator'
import CrudController from './Base/CrudController'

export default class TableController extends CrudController<
  TableValidator,
  Table,
  TableRepository
>{

  constructor() {
    super(
      new TableValidator(),
      new Table(),
      new TableRepository()
    )
  }

}

