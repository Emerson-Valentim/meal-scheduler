import test from 'japa'
import Establishment from '../../app/Models/Establishment'
import Schedule from '../../app/Models/Schedule'
import Orm from '../../start/orm'

test.group('Schedule Entity', () => {

  const ModelType = Schedule
  const modelRepository = Orm.instance.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: Schedule = {
      id: 1,
      definition: {
        '0': {
          end: '11:00:00',
          start: '11:20:00',
        }
      },
      establishment_id: new Establishment()
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})