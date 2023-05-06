import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Card extends Document {
  @Prop()
  cvv: number;

  @Prop({ default: 500 })
  balance: number;

  @Prop()
  type: string;

  @Prop()
  cardNumber: string;

  @Prop()
  transactions: [];

  @Prop()
  ownerName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const CardSchema = SchemaFactory.createForClass(Card);
