import Establishment from 'App/Models/Establishment'
import Menu from 'App/Models/Menu'
import test from 'japa'

test.group('Menu Entity', () => {

  test('Should create a Menu', (assert) => {
    const menuEntity = new Menu()
    assert.isDefined(menuEntity)    
  })

  test('Should create an Menu and manipulate his attributes', (assert) => {
    const menuEntity = new Menu()

    menuEntity.ingredients = 'ingredients'
    assert.isDefined(menuEntity.ingredients)

    menuEntity.name = 'name'
    assert.isDefined(menuEntity.name)

    menuEntity.value = 10.01
    assert.isDefined(menuEntity.value)

    menuEntity.id = 1
    assert.isDefined(menuEntity.id)
  })

  test('Should create an Menu and create a relation with Establishment', (assert) => {
    const menuEntity = new Menu()
    const establishmentEntity = new Establishment()

    menuEntity.establishment = establishmentEntity
    assert.isDefined(menuEntity.establishment)
  })

})