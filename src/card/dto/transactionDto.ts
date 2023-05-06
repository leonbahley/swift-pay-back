import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  readonly beneficiary: string;

  @IsNotEmpty()
  @IsString()
  readonly sender: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly donate: boolean;
}
