export default class HttpException extends Error {

  public statusCode: number
  public message: string

  constructor(message: string, status: number) {
    super(message)
    this.statusCode = status
    this.message = message
  }

}
