import Environment from 'App/Models/Environment'
import Reservation from 'App/Models/Reservation'
import Table from 'App/Models/Table'
import test from 'japa'

test.group('Table Entity', () => {

  test('Should create a Table', (assert) => {
    const tableEntity = new Table()
    assert.isDefined(tableEntity)    
  })

  test('Should create an Table and manipulate his attributes', (assert) => {
    const tableEntity = new Table()

    tableEntity.identification = 1
    assert.isDefined(tableEntity.identification)
    
    tableEntity.seats = 1
    assert.isDefined(tableEntity.seats)

    tableEntity.id = 1
    assert.isDefined(tableEntity.id)
  })

  test('Should create an User and create a relation with Environment and Reservation', (assert) => {
    const tableEntity = new Table()
    const environmentEntity = new Environment()
    const reservationEntity = new Reservation()
    
    tableEntity.environment = environmentEntity
    assert.isDefined(tableEntity.environment)

    tableEntity.reservation = [ reservationEntity ]
    assert.isArray(tableEntity.reservation)
    assert.isDefined(tableEntity.reservation)
  })

})