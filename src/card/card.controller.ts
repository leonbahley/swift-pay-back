import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCardDto } from './dto/createCardDto';
import { CardService } from './card.service';
import { TransactionDto } from './dto/transactionDto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/create')
  @UseGuards(AuthGuard())
  async createCard(
    @Res() response,
    @Body() createCardDto: CreateCardDto,
    @Req() req,
  ) {
    try {
      const card = await this.cardService.createCard(req.user, createCardDto);
      return response.status(HttpStatus.CREATED).json({
        card,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Card not added',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/transaction')
  @UseGuards(AuthGuard())
  async transaction(
    @Res() response,
    @Body() transactionDto: TransactionDto,
    @Req() req,
  ) {
    try {
      const card = await this.cardService.transaction(transactionDto, req.user);
      return response.status(HttpStatus.CREATED).json({
        card,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'transaction not added',
        error: err.message,
      });
    }
  }

  @Get('/cards')
  @UseGuards(AuthGuard())
  async getCards(@Res() response, @Req() req) {
    try {
      const cards = await this.cardService.getCards(req.user);
      return response.status(HttpStatus.CREATED).json({
        cards,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'cards not fetched',
        error: err.message,
      });
    }
  }
}
