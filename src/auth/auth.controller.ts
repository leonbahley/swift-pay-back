import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpWithEmailDto } from './dto/signUpWithEmailDto';
import { SignUpWithPhoneDto } from './dto/signUpWithPhoneDto';
import { LogInWithEmailDto } from './dto/logInWithEmailDto';
import { LogInWithPhoneDto } from './dto/loginWithPhoneDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up/email')
  signUpWithEmail(
    @Body() signUpWithEmailDto: SignUpWithEmailDto,
  ): Promise<{ token: string }> {
    return this.authService.signUpWithEmail(signUpWithEmailDto);
  }

  @Post('/sign-up/phone')
  signUpWithPhone(
    @Body() signUpWithPhoneDto: SignUpWithPhoneDto,
  ): Promise<{ token: string }> {
    return this.authService.signUpWithPhone(signUpWithPhoneDto);
  }

  @Post('/log-in/email')
  loginWithEmail(
    @Body() logInWithEmailDto: LogInWithEmailDto,
  ): Promise<{ token: string }> {
    return this.authService.logInWithEmail(logInWithEmailDto);
  }

  @Post('/log-in/phone')
  loginWithPhone(
    @Body() logInWithPhoneDto: LogInWithPhoneDto,
  ): Promise<{ token: string }> {
    return this.authService.logInWithPhone(logInWithPhoneDto);
  }
}
