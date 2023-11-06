import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
