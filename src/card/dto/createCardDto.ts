import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;
}
