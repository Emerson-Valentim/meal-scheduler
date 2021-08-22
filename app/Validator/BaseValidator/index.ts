import HttpException from 'App/Exceptions/HttpException'

export default abstract class BaseValidator {

  public static async validate(body, validator, validatorMethod: string ) {
    try {
      const schema = await validator[validatorMethod]().validateAsync(body)
      return schema
    } catch (error) {      
      const detailedError = this.buildError(error)
      throw new HttpException(detailedError.message.trim(), detailedError.statusCode, error)
    }
  }

  private static buildError(error) {
    return error.details.reduce((errorMessage, detail) => {
      errorMessage.message += `${detail.message} `
      return errorMessage
    }, {
      statusCode: 400,
      message: ''
    })
  }
}
