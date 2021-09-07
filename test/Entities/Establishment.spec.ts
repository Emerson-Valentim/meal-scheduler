import test from 'japa'
import Establishment, { Segmentation } from '../../app/Models/Establishment'
import Schedule from '../../app/Models/Schedule'
import User from '../../app/Models/User'
import Orm from '../../start/orm'

test.group('Establishment Entity', () => {

  const ModelType = Establishment
  const modelRepository = Orm.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: Establishment = {
      description: 'description',
      id: 1,
      category: Segmentation.BAKERY,
      environments: [] as any,
      menu_items: [] as any,
      name: 'Name',
      reservations: [] as any,
      schedule: new Schedule(),
      user: new User()
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})