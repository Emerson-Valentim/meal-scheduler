import ScheduleValidator from '../../app/Validator/ScheduleValidator'
import Schedule from '../../app/Models/Schedule'
import test from 'japa'
import { DateTime } from 'luxon'

test.group('ScheduleValidator', () => {

  const validator = new ScheduleValidator()

  test('Should validate if create schema accept all properties', (assert) => {
    const schema = validator.createValidation()

    const schedule: Omit<Schedule, 'id'> = {
      definition: {
        0: {
          start: '11:00:00',
          end: '11:00:00'
        }
      }
    }

    const { value: validated, error } = schema.validate(schedule)

    assert.isUndefined(error)
    assert.deepEqual(schedule, validated)
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
      definition: {

      }
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