import Environment from 'App/Models/Environment'
import EnvironmentRepository from 'App/Repository/EnvironmentRepository'
import Utils from 'App/Services/Utils'
import BaseValidator from 'App/Validator/BaseValidator'
import EnvironmentValidator from 'App/Validator/EnvironmentValidator'
import { APIGatewayEvent } from 'aws-lambda'
import { Authorizer } from './AuthorizerController'

import CrudController, { BaseHttpResponse } from './Base/CrudController'

export default class EnvironmentController extends CrudController<
  EnvironmentValidator,
  EnvironmentRepository,
  Environment
>{

  constructor() {
    super(
      new EnvironmentValidator(),
      new Environment(),
    )
  }

  public async create({
    body,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')

      const { principalId: user_id } = authorizer as Authorizer

      const user = await this.userRepository.findOneOrFail(user_id)

      this.userHasEstablishment(user.establishment?.id)

      const model = await this.repository.create(data)

      this.isUserEnabled(user, model.establishment.id)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(201, model)
    } catch (error) {
      throw error
    }
  }

  public async delete({
    pathParameters,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(pathParameters, this.validator, 'deleteByIdValidation')

      const { principalId: user_id } = authorizer as Authorizer

      const user = await this.userRepository.findOneOrFail(user_id)

      this.userHasEstablishment(user.establishment?.id)

      const model = await this.repository.findOneOrFail(data)

      this.isUserEnabled(user, model.establishment.id)

      await this.repository.removeAndFlush(model)

      return Utils.toHttpResponse(202, { message: `ID ${data.id} deleted.` })
    } catch (error) {
      throw error
    }
  }

  public async update({
    body,
    pathParameters,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const { pathParameters: { id }, body: data } = await BaseValidator.validate(
        { body, pathParameters },
        this.validator,
        'updateByIdValidation'
      )

      const { principalId: user_id } = authorizer as Authorizer

      const user = await this.userRepository.findOneOrFail(user_id)

      const model = await this.repository.findOneOrFail(id)

      this.isUserEnabled(user, model.establishment.id)

      this.modelUpdate(model, data)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(200, model)
    } catch (error) {
      throw error
    }
  }

}
