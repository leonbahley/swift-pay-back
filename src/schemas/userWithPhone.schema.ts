import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class UserWithPhone extends Document {
  @Prop()
  name: string;

  @Prop()
  hash: string;

  @Prop({
    unique: true,
  })
  phoneNumber: string;
}

export const UserWithPhoneSchema = SchemaFactory.createForClass(UserWithPhone);
