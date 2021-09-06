import test from 'japa'
import Environment from '../../app/Models/Environment'
import Table from '../../app/Models/Table'
import Orm from '../../start/orm'

test.group('Table Entity', () => {

  const ModelType = Table
  const modelRepository = Orm.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: Table = {
      id: 1,
      environment: new Environment(),
      identification: 1,
      reservation: [] as any,
      seats: 1
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})