import Establishment from '../../app/Models/Establishment'
import Reservation, { ReservationStatus } from '../../app/Models/Reservation'
import Table from '../../app/Models/Table'
import test from 'japa'

test.group('Reservation Entity', () => {

  test('Should create a Schedule', (assert) => {
    const reservationEntity = new Reservation()
    assert.isDefined(reservationEntity)    
  })

  test('Should create an Schedule and manipulate his attributes', (assert) => {
    const reservationEntity = new Reservation()

    reservationEntity.cpf = 'cpf'
    assert.isDefined(reservationEntity.cpf)
  
    reservationEntity.phone = 'phone'
    assert.isDefined(reservationEntity.phone)

    reservationEntity.status = ReservationStatus.CANCELED
    assert.isDefined(reservationEntity.status)

    reservationEntity.interval = {}
    assert.isDefined(reservationEntity.status)
    
    reservationEntity.id = 1
    assert.isDefined(reservationEntity.id)
  })

  test('Should create an Reservation and create a relation with Table and Establishment', (assert) => {
    const reservationEntity = new Reservation()
    const tableEntity = new Table()
    const establishmentEntity = new Establishment()
    
    reservationEntity.establishment = establishmentEntity
    assert.isDefined(reservationEntity.establishment)

    reservationEntity.table = tableEntity
    assert.isDefined(reservationEntity.table)
  })

})