import { IsNotEmpty, IsString } from 'class-validator';

export class LogInWithPhoneDto {
  @IsNotEmpty()
  @IsString({})
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
