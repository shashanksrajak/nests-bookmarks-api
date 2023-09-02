import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@GetUser() user: User) {
    // console.log(user);
    return user;
  }
}
