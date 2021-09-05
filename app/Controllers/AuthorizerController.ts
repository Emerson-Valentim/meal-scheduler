import User from 'App/Models/User';
import HttpException from 'App/Exceptions/HttpException';
import Orm from 'Start/orm';
import { Callback } from 'aws-lambda';

type Credentials = {
  cnpj: string
  password: string
}

export default class AuthorizerController {

  protected userRepository = Orm.instance.em.getRepository(User);

  public async authorize(event, context, callback: Callback) {

    const { headers: { Authorization } } = event

    if (!Authorization) {
      callback('Unauthorized', 401)
      throw new HttpException('Unauthorized', 401, event)
    }

    const token = Authorization.replace('Basic ', '')
    const [cnpj, password] = Buffer.from(token, 'base64').toString().split(':')

    const user = await this.findUser({ cnpj, password }, event, callback)

    this.allowUser(event, user, callback)
  }

  private async findUser(credentials: Credentials, event, callback) {
    const user = await this.userRepository.findOne(credentials)

    if (!user) {
      callback('Unauthorized')
      throw new HttpException('User not found', 404, event)
    }

    const { id, cnpj, establishment_id } = user

    return {
      id, cnpj, establishment_id
    }
  }

  private allowUser(event, user, callback) {
    const { methodArn } = event
    const [, , , awsRegion, awsAccountId, apiGatewayArnTmp] = methodArn.split(':')
    const [restApiId, stage] = apiGatewayArnTmp.split('/')
    const apiArn = `arn:aws:execute-api:${awsRegion}:${awsAccountId}:${restApiId}/${stage}/*/*`
    const policy = {
      principalId: user,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: [apiArn]
          }
        ]
      }
    }
    callback(null, policy)
  }

}
