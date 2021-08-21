import { APIGatewayEvent } from 'aws-lambda'
import HttpController from './HttpController'

export default class EstablishmentController extends HttpController{
  public async create(event: APIGatewayEvent, context): Promise<any> {
    return {
      statusCode: 200,
      body: {
        a: 1
      }
    }
  }
}

