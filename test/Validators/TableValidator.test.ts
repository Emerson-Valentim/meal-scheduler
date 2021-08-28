import TableValidator from '../../app/Validator/TableValidator'
import test from 'japa'

test.group('TableValidator', () => {

  const validator = new TableValidator()
  
  test('Should validate if create schema accept all properties', (assert) => {
    const schema = validator.createValidation()
  })

  test('Should validate if update schema accept all properties', (assert) => {
    const schema = validator.updateByIdValidation()
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