import { Controller, Get } from '@nestjs/common';

@Controller('dog')
export class DogController {
  constructor() {}

  @Get('/')
  getDog(): string {
    return 'dog';
  }
}
