import EnvironmentValidator from '../../app/Validator/EnvironmentValidator'
import Environment, { EnvironmentLocation } from '../../app/Models/Environment'
import test from 'japa'

test.group('EnvironmentValidator', () => {

  const validator = new EnvironmentValidator()

  test('Should validate if create schema accept all properties', (assert) => {
    const schema = validator.createValidation()

    const environment: Omit<Environment, 'id' | 'establishment' | 'table'> & Pick<any, 'establishment_id'> = {
      location: EnvironmentLocation.INDOOR,
      description: 'description',
      pets_allowed: true,
      smoking_allowed: true,
      establishment_id: 1,
    }

    const { value: validated, error } = schema.validate(environment)

    assert.isUndefined(error)
    assert.deepEqual({ ...environment, establishment: 1 }, validated)
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
      pets_allowed: false
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