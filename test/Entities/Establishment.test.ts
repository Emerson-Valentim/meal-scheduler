import Environment from 'App/Models/Environment'
import Establishment, { Segmentation } from 'App/Models/Establishment'
import Menu from 'App/Models/Menu'
import Reservation from 'App/Models/Reservation'
import Schedule from 'App/Models/Schedule'
import test from 'japa'

test.group('Establishment Entity', () => {

  test('Should create a Establishment', (assert) => {
    const establishmentEntity = new Establishment()
    assert.isDefined(establishmentEntity)
  })

  test('Should create an Establishment and manipulate his attributes', (assert) => {
    const establishmentEntity = new Establishment()

    establishmentEntity.category = Segmentation.BAKERY
    assert.isDefined(establishmentEntity)

    establishmentEntity.description = 'description'
    assert.isDefined(establishmentEntity.description)

    establishmentEntity.name = 'name'
    assert.isDefined(establishmentEntity.name)

    establishmentEntity.id = 1
    assert.isDefined(establishmentEntity.id)
  })

  test('Should create an Establishment and create a relation with User', (assert) => {
    const establishmentEntity = new Establishment()
    const menuEntity = new Menu()
    const environmentEntity = new Environment()
    const reservationEntity = new Reservation()
    const scheduleEntity = new Schedule()

    establishmentEntity.menu = [menuEntity]
    assert.isDefined(establishmentEntity.menu)

    establishmentEntity.environment = [environmentEntity]
    assert.isDefined(establishmentEntity.environment)
    
    establishmentEntity.reservation = [reservationEntity]
    assert.isDefined(establishmentEntity.reservation)

    establishmentEntity.schedule = scheduleEntity
    assert.isDefined(establishmentEntity.schedule)
  })

})