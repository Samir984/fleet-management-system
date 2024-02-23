/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const user = await this.userModel.create(createUserDto);

    // Exclude the password field from the response
    const { password, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email }).exec();

    if (!user || user.password != password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //assign jwt token
    const payload = { _id: user._id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
