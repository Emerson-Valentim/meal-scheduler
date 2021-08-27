import Establishment from 'App/Models/Establishment'
import User from 'App/Models/User'
import test from 'japa'

test.group('User Entity', () => {

  test('Should create an User', (assert) => {
    const userEntity = new User()
    assert.isDefined(userEntity)
  })

  test('Should create an User and manipulate his attributes', (assert) => {
    const userEntity = new User()
    userEntity.cnpj = 'cnpj'    
    assert.isDefined(userEntity.cnpj)
    
    userEntity.password = 'password'
    assert.isDefined(userEntity.password)
    
    userEntity.phone = 'phone'
    assert.isDefined(userEntity.phone)

    userEntity.id = 1
    assert.isDefined(userEntity.id)
  })

  test('Should create an User and create a relation with Establishment', (assert) => {
    const userEntity = new User()
    const establishmentEntity = new Establishment()
    
    userEntity.establishment = establishmentEntity
    assert.isDefined(userEntity.establishment)
  })

})