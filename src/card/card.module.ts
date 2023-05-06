import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardSchema } from 'src/schemas/card.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { UserWithPhoneSchema } from 'src/schemas/userWithPhone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Card', schema: CardSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UserWithPhone', schema: UserWithPhoneSchema },
    ]),
    AuthModule,
  ],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
