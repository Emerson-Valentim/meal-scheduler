import Utils from 'App/Services/Utils'
import BaseValidator from 'App/Validator/BaseValidator'
import { APIGatewayEvent } from 'aws-lambda'

export interface BaseCrudValidator {
  createValidation()
  filterValidation()
  updateByIdValidation()
  deleteByIdValidation()
}

export type BaseHttpResponse = {
  statusCode: number
  body: object
}

export default abstract class CrudController<
  Validator extends BaseCrudValidator,
  T> {

  constructor(
    public readonly validator: Validator,
    public readonly model: T,
  ) {
  }

  public async create({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')

      return Utils.toHttpResponse(201, data)
    } catch (error) {
      throw error
    }
  }

  public async delete({ pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(pathParameters, this.validator, 'deleteByIdValidation')

      return Utils.toHttpResponse(202, { message: `ID ${data.id} deleted.` })
    } catch (error) {
      throw error
    }
  }

  public async load({ queryStringParameters, pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      ({ pathParameters } = await BaseValidator.validate(
        { queryStringParameters, pathParameters },
        this.validator,
        'filterValidation')
      )

      return Utils.toHttpResponse(404, [])
    } catch (error) {
      throw error
    }
  }

  public async update({ headers, body, pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const { pathParameters: { id }, body: data } = await BaseValidator.validate(
        { body, pathParameters },
        this.validator,
        'updateByIdValidation'
      )

      return Utils.toHttpResponse(200, data)
    } catch (error) {
      throw error
    }
  }
}