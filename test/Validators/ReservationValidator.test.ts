import ReservationValidator from '../../app/Validator/ReservationValidator'
import test from 'japa'
import Reservation, { ReservationStatus } from '../../app/Models/Reservation'
import { DateTime } from 'luxon'

test.group('ReservationValidator', () => {

  const validator = new ReservationValidator()

  test('Should validate if create schema accept all properties', (assert) => {
    const schema = validator.createValidation()

    const reservation: Omit<Reservation, 'id'|'table'|'establishment'> & Pick<any, 'table_id'|'establishment_id'> = {
      cpf: '00000000000',
      phone: '5511999999999',
      interval: {
        start: DateTime.now().toUTC().toString() as unknown as DateTime,
        end: DateTime.now().toUTC().toString() as unknown as DateTime
      },
      status: ReservationStatus.CANCELED,
      establishment_id: 1,
      table_id: 1
    }

    const { value: validated, error } = schema.validate(reservation)

    assert.isUndefined(error)
    assert.deepEqual({...reservation, table: 1, establishment: 1}, validated)
    assert.isNotNull(validated)
  })

  test('Should validate if update accept all properties', (assert) => {
    const schema = validator.updateByIdValidation()

    const { error: validateError } = schema.validate({})

    assert.isDefined(validateError)
    assert.equal(validateError!.message, '"body" is required')

    const pathParameters = {
      id: 1
    }

    const { value: validateId } = schema.validate({ pathParameters, body: {} })

    assert.isDefined(validateId)
    assert.isObject(validateId)

    const body = {
      status: ReservationStatus.FINISHED
    }

    const { value: validateFull, error } = schema.validate({ pathParameters, body })
    
    assert.isUndefined(error)
    assert.isDefined(validateFull)
    assert.hasAllDeepKeys(validateFull, { pathParameters, body })
  })

  test('Should validate if load accept all properties', (assert) => {
    const schema = validator.filterValidation()

    const pathParameters = {
      id: 1
    }

    const { value: validateId, error } = schema.validate({ pathParameters })

    assert.isUndefined(error)
    assert.isDefined(validateId)
    assert.isObject(validateId)
  })

  test('Should validate if delete accept all properties', (assert) => {
    const schema = validator.deleteByIdValidation()

    const id = 1

    const { value: validateId, error } = schema.validate({ id })

    assert.isUndefined(error)
    assert.isDefined(validateId)
    assert.isObject(validateId)
  })
})