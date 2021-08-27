import Establishment from 'App/Models/Establishment'
import MenuItem from 'App/Models/MenuItem'
import test from 'japa'

test.group('Menu Entity', () => {

  test('Should create a Menu', (assert) => {
    const menuItemEntity = new MenuItem()
    assert.isDefined(menuItemEntity)    
  })

  test('Should create an Menu and manipulate his attributes', (assert) => {
    const menuItemEntity = new MenuItem()

    menuItemEntity.ingredients = 'ingredients'
    assert.isDefined(menuItemEntity.ingredients)

    menuItemEntity.name = 'name'
    assert.isDefined(menuItemEntity.name)

    menuItemEntity.value = 10.01
    assert.isDefined(menuItemEntity.value)

    menuItemEntity.id = 1
    assert.isDefined(menuItemEntity.id)
  })

  test('Should create an Menu and create a relation with Establishment', (assert) => {
    const menuItemEntity = new MenuItem()
    const establishmentEntity = new Establishment()

    menuItemEntity.establishment = establishmentEntity
    assert.isDefined(menuItemEntity.establishment)
  })

})