import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { RssState, RssSubscription } from 'src/modules/mikroorm/entities/RssSubscription';
import { Ticket } from 'src/modules/mikroorm/entities/Ticket';
import { Locale, User, UserRole } from 'src/modules/mikroorm/entities/User';
import { BotContext } from 'src/types/interfaces';

@Injectable()
export class globalService {
  constructor(private readonly em: EntityManager) { }

  async toggleRssSubscription(subscription: RssSubscription): Promise<RssSubscription> {
    subscription.state = subscription.state == RssState.ON ? RssState.OFF : RssState.ON;
    await this.em.persistAndFlush(subscription);
    return subscription;
  }
  async getRssSubscription(ctx: BotContext): Promise<RssSubscription> {
    const subscription = await this.em.findOne(RssSubscription, { groupId: String(ctx.message.chat.id), forumId: String(ctx.message.message_thread_id || 0) });
    return subscription;
  }
  async createRssSubscription(ctx: any): Promise<RssSubscription> {
    const newSubscription = this.em.create(RssSubscription, {
      groupId: String(ctx.message.chat.id),
      ...ctx.message.message_thread_id ? { forumId: String(ctx.message.message_thread_id) } : {},
      title: ctx.message.chat.title,
      url: ctx.message.text,
      state: RssState.ON,
    });
    await this.em.persistAndFlush(newSubscription);
    return newSubscription;
  }

  async createTicket(ctx: BotContext) {
    const issuer = await this.getUser(ctx);
    const ticket = this.em.create(Ticket, {
      object: ctx.message.text.substring(1),
      user: issuer,
    });
    await this.em.persistAndFlush(ticket);
    return ticket;
  }

  async getUser(ctx: BotContext) {
    let user = await this.em.findOne(User, { chatId: String(ctx.from.id) });
    if (!user) {
      user = this.em.create(User, {
        chatId: String(ctx.from.id),
        username: ctx.from.username,
      });
      await this.em.persistAndFlush(user);
    }
    return user;
  }
}
