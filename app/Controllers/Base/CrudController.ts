import { EntityRepository } from '@mikro-orm/knex'
import Utils from 'App/Services/Utils'
import BaseValidator from 'App/Validator/BaseValidator'
import { APIGatewayEvent } from 'aws-lambda'
import { AnyEntity, wrap } from 'mikro-orm'
import Orm from 'Start/orm'

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
  Model extends AnyEntity<Model>> {

  protected repository: EntityRepository<Model>

  constructor(
    public readonly validator: Validator,
    public readonly model: Model
  ) {
    this.repository = Orm.getInstance().em.getRepository(this.model as any) as any
  }

  public async create({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')

      const model = await this.repository.create(data)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(201, model)
    } catch (error) {
      throw error
    }
  }

  public async delete({ pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(pathParameters, this.validator, 'deleteByIdValidation')

      const model = await this.repository.findOneOrFail(data)

      await this.repository.removeAndFlush(model)

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

      if (pathParameters?.id) {
        const model = await this.repository.findOneOrFail(pathParameters)

        return Utils.toHttpResponse(200, model)
      }

      const allModels = await this.repository.findAll()

      if (allModels.length) {
        return Utils.toHttpResponse(200, allModels)
      }

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

      const model = await this.repository.findOneOrFail(id)

      wrap(model).assign(data)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(200, model)
    } catch (error) {
      throw error
    }
  }
}