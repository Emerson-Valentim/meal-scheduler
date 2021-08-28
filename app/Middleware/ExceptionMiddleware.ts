import Logger from 'App/Services/Logger'

export default class ExceptionMiddleware {
  public static handle(response, error) {
    if (error.statusCode) {
      response.statusCode = error.statusCode
      response.body['message'] = error.message
    } else if (error.name === 'EntityNotFoundError') {
      response.statusCode = 404
      response.body['message'] = error.message
    } else {
      Logger.ERROR('Unknown error', 500, error)
    }
  }
}