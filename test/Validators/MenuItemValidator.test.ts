import MenuItemValidator from '../../app/Validator/MenuItemValidator'
import MenuItem from '../../app/Models/MenuItem'
import test from 'japa'

test.group('MenuItemValidator', () => {

  const validator = new MenuItemValidator()

  test('Should validate if create schema accept all properties', (assert) => {
    const schema = validator.createValidation()

    const menuItem: Omit<MenuItem, 'id' | 'establishment'> & Pick<any, 'establishment_id'> = {
      name: 'name',
      ingredients: 'ingredients',
      value: 10.01,
      establishment_id: 1
    }

    const { value: validated, error } = schema.validate(menuItem)

    assert.isUndefined(error)
    assert.deepEqual({ ...menuItem, establishment: 1 }, validated)
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
      name: 'Menu item'
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