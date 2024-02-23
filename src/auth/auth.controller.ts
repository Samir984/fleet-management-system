import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return { status: 'success', data: user };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const token = await this.authService.login(loginUserDto);
      return { status: 'success', token };
    } catch (error) {
      throw new HttpException(
        { status: 'error', message: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
