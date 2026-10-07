import { SharedService } from '@app/shared';
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service.js';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
  ) {}

  @Get()
  getHello(): string {
    return `${this.apiService.getHello()} --- ${this.sharedService.getMessage()}`;
  }
}
