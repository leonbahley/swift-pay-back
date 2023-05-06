import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';

import { User } from 'src/schemas/user.schema';
import { TransactionDto } from './dto/transactionDto';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private cardModel: Model<Card>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createCard(user: User, createCardDto): Promise<Card> {
    const cvvCode = () => Math.floor(Math.random() * 900) + 100;

    function generateRandomNumber() {
      const firstFour = Math.floor(1000 + Math.random() * 9000).toString();
      const secondFour = Math.floor(1000 + Math.random() * 9000).toString();
      const thirdFour = Math.floor(1000 + Math.random() * 9000).toString();
      const fourthFour = Math.floor(1000 + Math.random() * 9000).toString();
      return `${firstFour}${secondFour}${thirdFour}${fourthFour}`;
    }
    const data = Object.assign(
      {
        ...createCardDto,
        cardNumber: generateRandomNumber(),
        ownerName: user.name,
        cvv: cvvCode(),
      },
      { owner: user._id },
    );
    const addedCard = await new this.cardModel(data);
    return addedCard.save();
  }

  async transaction(transactionDto: TransactionDto, user: User): Promise<Card> {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const formattedDate = `${day}-${month}-${year}`;

    const { amount, beneficiary, sender, donate } = transactionDto;

    const benificiaryAccount = await this.cardModel.findOne({
      cardNumber: beneficiary,
    });

    if (!donate && !benificiaryAccount) {
      throw new Error('Beneficiary not found');
    }

    const senderData = await this.cardModel.findOneAndUpdate(
      { cardNumber: sender },
      {
        $push: {
          transactions: {
            type: 'send',
            amount,
            beneficiary,
            formattedDate,
            sender,
          },
        },
        $inc: { balance: -amount },
      },
      { new: true },
    );
    if (donate) {
      return senderData;
    }
    await this.cardModel.findOneAndUpdate(
      { cardNumber: beneficiary },
      {
        $push: {
          transactions: {
            type: 'receive',
            amount,
            sender,
            formattedDate,
          },
        },
        $inc: { balance: amount },
      },
      { new: true },
    );

    return senderData;
  }

  getCards = async (user: User): Promise<Card[]> => {
    const cards = await this.cardModel.find({ owner: user._id });
    return cards;
  };
}
