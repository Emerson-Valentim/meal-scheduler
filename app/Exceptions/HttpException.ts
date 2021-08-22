export default class HttpException extends Error {

  public statusCode: number
  public message: string

  constructor(message: string, status: number, error) {
    console.log(JSON.stringify({
      level: 'ERROR',
      message: error.message
    }))
    super(message)
    this.statusCode = status
    this.message = message
  }

}
