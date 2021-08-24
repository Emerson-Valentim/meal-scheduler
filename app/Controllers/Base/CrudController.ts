import Utils from 'App/Services/Utils'
import BaseValidator from 'App/Validator/BaseValidator'
import { APIGatewayEvent } from 'aws-lambda'
import { DeepPartial, getCustomRepository, Repository } from 'typeorm'

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
  Model extends DeepPartial<any>,
  ModelRepository extends Repository<Model>> {

  protected readonly repository: Repository<Model>

  constructor(
    public readonly validator: Validator,
    public readonly model: Model,
    repository: ModelRepository
  ) {
    this.repository = getCustomRepository(repository.constructor)
  }

  public async create({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')
      const model = this.repository.create()

      Utils.mapKeys(model, data)

      await this.repository.save(model)

      return Utils.toHttpResponse(201, model)
    } catch (error) {
      throw error
    }
  }

  public async delete({ pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(pathParameters, this.validator, 'deleteByIdValidation')

      const model = await this.repository.findOneOrFail(data.id)

      await this.repository.delete(model)

      return Utils.toHttpResponse(202, { message: `ID ${data.id} deleted.` })
    } catch (error) {
      throw error
    }
  }

  public async load({ queryStringParameters, pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      ({ pathParameters } = await BaseValidator.validate({ queryStringParameters, pathParameters }, this.validator, 'filterValidation'))

      if (pathParameters?.id) {
        const model = await this.repository.findOneOrFail(pathParameters.id)
  
        return Utils.toHttpResponse(200, model)
      }

      const allModels = await this.repository.find()

      if(allModels.length) {
        return Utils.toHttpResponse(200, allModels)
      }
      
      return Utils.toHttpResponse(404, [])
    } catch (error) {
      throw error
    }
  }

  public async update({ body, pathParameters }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const { pathParameters: { id }, body: data } = await BaseValidator.validate({ body, pathParameters }, this.validator, 'updateByIdValidation')
      
      const model = await this.repository.findOneOrFail(id)

      await this.repository.update(model, data)

      const updatedModel = await this.repository.findOneOrFail(id)

      return Utils.toHttpResponse(200, updatedModel)
    } catch (error) {
      throw error
    }
  }
}