import Logger from 'App/Services/Logger'

export default class HttpException extends Error {

  public statusCode: number
  public message: string

  constructor(message: string, status: number, error) {
    super(message)
    this.statusCode = status
    this.message = message
    Logger.ERROR(message, status, error)
  }

}
