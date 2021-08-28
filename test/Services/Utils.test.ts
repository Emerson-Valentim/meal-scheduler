import Utils from '../../app/Services/Utils'
import test from 'japa'

test.group('Utils Service', () => {

  test('Should replace object1 values for object2 correspondents keys', (assert) => {
    const object1 = {
      a: 1,
      b: 2,
    }

    const object2 = {
      a: 3,
      b: 4,
    }

    Utils.mapKeys(object1, object2)

    assert.containsAllDeepKeys(object1, object2)
    assert.deepEqual(object1, object2)

    assert.strictEqual(object1.a, 3)
    assert.strictEqual(object1.b, 4)
  })

  test('Should return an object in gateway format', (assert) => {
    const httpResponse = Utils.toHttpResponse(200, { message: 'String' })

    assert.strictEqual(httpResponse.statusCode, 200)

    assert.isObject(httpResponse.body)
    assert.isDefined(httpResponse.body.message)
    assert.strictEqual(httpResponse.body.message, 'String')
  })
})