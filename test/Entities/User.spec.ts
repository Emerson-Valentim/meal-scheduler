import test from 'japa'
import Establishment from '../../app/Models/Establishment'
import User from '../../app/Models/User'
import Orm from '../../start/orm'

test.group('User Entity', () => {

  const ModelType = User
  const modelRepository = Orm.instance.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: User = {
      id: 1,
      cnpj: 'cnpj',
      establishment_id: new Establishment(),
      password: 'password',
      phone: 'phone'
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})