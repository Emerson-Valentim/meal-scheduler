import test from 'japa'
import Establishment from '../../app/Models/Establishment'
import User from '../../app/Models/User'
import Orm from '../../start/orm'

test.group('User Entity', () => {

  const ModelType = User
  const modelRepository = Orm.em.getRepository(ModelType)

  test('Create new entity and validate all fields', (assert) => {

    const modelDefinition: User = {
      id: 1,
      cnpj: 'cnpj',
      establishment: new Establishment(),
      password: 'password',
      phone: 'phone'
    }
    const model = modelRepository.create(modelDefinition)

    assert.hasAllDeepKeys(model, modelDefinition)
  })

})