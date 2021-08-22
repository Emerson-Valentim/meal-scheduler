export default class ExceptionMiddleware {
  public static handle (response, error) {
    if(error.statusCode) {
      response.statusCode = error.statusCode
      response.body['message'] = error.message
    }
  }
}