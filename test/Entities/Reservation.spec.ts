import test from 'japa'
import { DateTime } from 'luxon'
import Establishment from '../../app/Models/Establishment'
import Reservation, { ReservationStatus } from '../../app/Models/Reservation'
import Table from '../../app/Models/Table'
import Orm from '../../start/orm'

test.group('Reservation Entity', () => {

  const ModelType = Reservation
  const modelRepository = Orm.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: Reservation = {
      id: 1,
      cpf: 'cpf',
      interval: {
        end: DateTime.now(),
        start: DateTime.now().plus({ minutes: 30 }),
      },
      phone: 'phone',
      status: ReservationStatus.CANCELED,
      table: new Table(),
      establishment: new Establishment()
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})