import { APIGatewayEvent } from 'aws-lambda'
import Establishment from 'App/Models/Establishment'
import BaseValidator from 'App/Validator/BaseValidator'
import EstablishmentValidator from 'App/Validator/EstablishmentValidator'
import Utils from 'App/Services/Utils'
import CrudController, { BaseHttpResponse } from './Base/CrudController'
import { Authorizer } from './AuthorizerController'

export default class EstablishmentController extends CrudController<
  EstablishmentValidator,
  Establishment
>{

  constructor() {
    super(
      new EstablishmentValidator(),
      new Establishment(),
    )
  }

  public async create({
    body,
    requestContext: { authorizer }
  }: APIGatewayEvent): Promise<BaseHttpResponse> {
    try {
      const data = await BaseValidator.validate(body, this.validator, 'createValidation')

      const { principalId: { id: user_id, establishment } } = authorizer as Authorizer

      if (establishment) return Utils.toHttpResponse(400, { message: 'User already has an establishment' })

      const model = await this.repository.create(data)

      await this.repository.persistAndFlush(model)

      const user = await this.userRepository.findOneOrFail(user_id)

      this.modelUpdate(user, {
        establishment: model
      })

      await this.userRepository.persistAndFlush(user)

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

      const { principalId: { id: user_id, establishment } } = authorizer as Authorizer

      this.userHasEstablishment(establishment?.id)

      const model = await this.repository.findOneOrFail(data)

      const user = await this.userRepository.findOneOrFail(user_id)

      this.isUserEnabled(user, model.id)

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

      const { principalId: { id: user_id } } = authorizer as Authorizer

      const user = await this.userRepository.findOneOrFail(user_id)

      const model = await this.repository.findOneOrFail(id)

      this.isUserEnabled(user, model.id)

      this.modelUpdate(model, data)

      await this.repository.persistAndFlush(model)

      return Utils.toHttpResponse(200, model)
    } catch (error) {
      throw error
    }
  }

}
