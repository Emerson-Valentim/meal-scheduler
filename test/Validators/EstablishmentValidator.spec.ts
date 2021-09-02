import EstablishmentValidator from '../../app/Validator/EstablishmentValidator'
import test from 'japa'
import Establishment, { Segmentation } from '../../app/Models/Establishment'

test.group('EstablishmentValidator', () => {

  const validator = new EstablishmentValidator()

  test('Should validate if create schema accept all properties', (assert) => {
    const schema = validator.createValidation()

    const establishment: Omit<Establishment, 'id'|'schedule'|'menu'|'environment'|'reservation'> = {
      category: Segmentation.BAKERY,
      description: 'description',
      name: 'name'
    }

    const { value: validated, error } = schema.validate(establishment)

    assert.isUndefined(error)
    assert.deepEqual(establishment, validated)
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
      name: 'Establishment'
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