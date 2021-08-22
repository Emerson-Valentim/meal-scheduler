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

        this.repository.save(model)

        return {
          statusCode: 201,
          body: model
        }
      } catch (error) {
        throw error
      }
    }

    public async deleteById({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
      try {
        const data = await BaseValidator.validate(body, this.validator, 'deleteByIdValidation')
        console.log('delete')
        return data
      } catch (error) {
        throw error
      }
    }

    public async load({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
      try {
        const data = await BaseValidator.validate(body, this.validator, 'filterValidation')
        console.log('load')
        return data
      } catch (error) {
        throw error
      }
    }

    public async updateById({ body }: APIGatewayEvent): Promise<BaseHttpResponse> {
      try {
        const data = await BaseValidator.validate(body, this.validator, 'updateByIdValidation')
        console.log('update')
        return data
      } catch (error) {
        throw error
      }
    }
}
