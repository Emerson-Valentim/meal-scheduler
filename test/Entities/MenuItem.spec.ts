import test from 'japa'
import Establishment from '../../app/Models/Establishment'
import MenuItem from '../../app/Models/MenuItem'
import Orm from '../../start/orm'

test.group('MenuItem Entity', () => {

  const ModelType = MenuItem
  const modelRepository = Orm.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: MenuItem = {
      id: 1,
      establishment: new Establishment(),
      ingredients: 'ingredients',
      name: 'name',
      value: 10.00
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})