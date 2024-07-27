import { UserService } from '@Application/services/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@Shared/dto/request/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }
}
