import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationException
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(422).json({
      statusCode: 422,
      error: `Unprocessable Entity`,
      message: exception.response.message,
    });
  }
}
