import Schedule from '../../app/Models/Schedule'
import test from 'japa'

test.group('Schedule Entity', () => {

  test('Should create a Schedule', (assert) => {
    const scheduleEntity = new Schedule()
    assert.isDefined(scheduleEntity)
  })

  test('Should create an Schedule and manipulate his attributes', (assert) => {
    const scheduleEntity = new Schedule()

    scheduleEntity.definition = {}
    assert.isDefined(scheduleEntity.definition)

    scheduleEntity.id = 1
    assert.isDefined(scheduleEntity.id)
  })

})