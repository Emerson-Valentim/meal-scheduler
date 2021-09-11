import { APIGatewayEvent } from 'aws-lambda';

export default class BodyMiddleware {
  public static requestParser (event: APIGatewayEvent, context) {
    try {
      if(typeof event.body === 'string') {
        event.body = JSON.parse(event.body) ?? {}
      }
    } catch (error) {
      throw error
    }
  }

  public static responseParser (event: APIGatewayEvent, context) {
    try {
      if(typeof event.body === 'object') {
        event.body = JSON.stringify(event.body) ?? {}
      }
      event.headers = {
        ...event.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      }
      return event
    } catch (error) {
      throw error
    }
  }

}