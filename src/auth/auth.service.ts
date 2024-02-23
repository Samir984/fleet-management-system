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
  async register(createUserDto: CreateUserDto): Promise<{ user: User }> {
    const { email } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    console.log(createUserDto);
    const user = await this.userModel.create(createUserDto);

    return { user };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
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
