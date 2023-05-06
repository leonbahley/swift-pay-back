import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpWithPhoneDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString({})
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
