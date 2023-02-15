import { EntityManager } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { Bot } from 'grammy';
import { BOT_NAME } from 'src/constants';
import { BotContext } from 'src/types/interfaces';
import { Ticket, TicketStatus } from '../mikroorm/entities/Ticket';
import { RetrieveTicketDto } from './dto/retrieve-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly em: EntityManager, @Inject(BOT_NAME) private bot: Bot<BotContext>,) { }


  async findAll(): Promise<RetrieveTicketDto[]> {
    const tickets = await this.em.find(Ticket, {}, { populate: ['user'] });
    return tickets.map((ticket) => new RetrieveTicketDto(ticket));
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.em.findOne(Ticket, id, { populate: ['user'] });
    ticket.response = updateTicketDto.response;
    ticket.status = TicketStatus.ANSWERED;
    await this.em.persistAndFlush(ticket);
    if (updateTicketDto.response !== '') {
      this.bot.api.sendMessage(ticket.user.chatId, updateTicketDto.response)
    }
    return new RetrieveTicketDto(ticket);
  }

}
