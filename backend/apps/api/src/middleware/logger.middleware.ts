import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: (error?: any) => void) {
    console.log(req.get('host'), req.method);

    next();
  }
}
