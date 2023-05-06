import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from 'src/schemas/user.schema';
import { UserWithPhone } from 'src/schemas/userWithPhone.schema';
import { SignUpWithPhoneDto } from './dto/signUpWithPhoneDto';
import { SignUpWithEmailDto } from './dto/signUpWithEmailDto';
import { LogInWithEmailDto } from './dto/logInWithEmailDto';
import { LogInWithPhoneDto } from './dto/loginWithPhoneDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserWithPhone')
    private UserWithPhoneModel: Model<UserWithPhone>,
    private jwtService: JwtService,
    @InjectModel('User')
    private UserModel: Model<User>,
  ) {}

  async signUpWithEmail(
    signUpWithEmailDto: SignUpWithEmailDto,
  ): Promise<{ token: string }> {
    const { name, email, password } = signUpWithEmailDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.UserModel.create({
        name,
        email,
        hash: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email taken');
      }
    }
  }

  async signUpWithPhone(
    signUpWithPhoneDto: SignUpWithPhoneDto,
  ): Promise<{ token: string }> {
    const { name, phoneNumber, password } = signUpWithPhoneDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.UserWithPhoneModel.create({
        name,
        phoneNumber,
        hash: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Phone taken');
      }
    }
  }

  async logInWithEmail(logInWithEmailDto: LogInWithEmailDto): Promise<any> {
    const { email, password } = logInWithEmailDto;

    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.hash);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, user };
  }

  async logInWithPhone(logInWithPhoneDto: LogInWithPhoneDto): Promise<any> {
    const { phoneNumber, password } = logInWithPhoneDto;

    const user = await this.UserWithPhoneModel.findOne({ phoneNumber });

    if (!user) {
      throw new UnauthorizedException('Invalid number or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.hash);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid number or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, user };
  }
}
