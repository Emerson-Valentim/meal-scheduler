import User from 'App/Models/User';
import Orm from 'Start/orm';

type Credentials = {
  cnpj: string
  password: string
}

export type Authorizer = {
  principalId: number
}

let policy = {
  principalId: '',
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: 'Deny',
        Resource: []
      }
    ]
  }
}

export default class AuthorizerController {

  protected userRepository = Orm.em.getRepository(User);

  public async authorize(event) {

    const { headers } = event

    const Authorization = headers['Authorization'] || headers['authorization']

    if (!Authorization) {
      return policy
    }

    const token = Authorization.replace('Basic ', '')
    const [cnpj, password] = Buffer.from(token, 'base64').toString().split(':')

    const user = await this.findUser({ cnpj, password })

    if (!user) return policy

    return this.generatePolicy(event, user)
  }

  private async findUser(credentials: Credentials) {
    const user: User = await this.userRepository.findOne(credentials)

    if (!user) {
      return
    }

    const { id, cnpj, establishment } = user

    return {
      id, cnpj, establishment
    }
  }

  private generatePolicy(event, user) {
    const { methodArn } = event
    const [, , , awsRegion, awsAccountId, apiGatewayArnTmp] = methodArn.split(':')
    const [restApiId, stage] = apiGatewayArnTmp.split('/')
    const apiArn = `arn:aws:execute-api:${awsRegion}:${awsAccountId}:${restApiId}/${stage}/*/*`
    const allowPolicy = {
      principalId: user.id,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: [apiArn]
          }
        ]
      },
      context: {
        id: user.id,
        cnpj: user.cnpj
      }
    }
    return allowPolicy
  }

}
