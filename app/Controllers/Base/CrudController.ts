import { EntityRepository } from '@mikro-orm/knex'
import HttpException from 'App/Exceptions/HttpException'
import User from 'App/Models/User'
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
  protected userRepository = Orm.em.getRepository(User)

  constructor(
    public readonly validator: Validator,
    public readonly model: Model
  ) {
    this.repository = Orm.em.getRepository(model.__meta?.className) as any
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

      this.modelUpdate(model, data)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(200, model)
    } catch (error) {
      throw error
    }
  }

  protected userHasEstablishment(model_id: number | undefined) {
    if (!model_id) {
      throw new HttpException('User has no establishment', 400, {})
    }
  }

  protected isUserEnabled(user: User, model_id: number) {
    if (user.establishment.id !== model_id) {
      throw new HttpException('User is not the establishment owner', 400, {})
    }
  }

  protected modelUpdate(model, updateData) {
    wrap(model).assign(updateData)
  }
}