import test from 'japa'
import Environment, { EnvironmentLocation } from '../../app/Models/Environment'
import Establishment from '../../app/Models/Establishment'
import Table from '../../app/Models/Table'
import Orm from '../../start/orm'

test.group('Environment Entity', () => {

  const ModelType = Environment
  const modelRepository = Orm.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: Environment = {
      description: 'description',
      establishment: new Establishment(),
      id: 1,
      location: EnvironmentLocation.INDOOR,
      pets_allowed: true,
      smoking_allowed: true,
      tables: [] as any
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})