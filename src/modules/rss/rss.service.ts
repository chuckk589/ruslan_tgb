import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { RssState, RssSubscription } from '../mikroorm/entities/RssSubscription';
import { RetrieveRssDto } from './dto/retrieve-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';

@Injectable()
export class RssService {
  constructor(private readonly em: EntityManager) { }

  async findAll(): Promise<RetrieveRssDto[]> {
    const subs = await this.em.find(RssSubscription, {});
    return subs.map(sub => new RetrieveRssDto(sub));
  }

  async update(id: number, updateRssDto: UpdateRssDto) {
    const sub = await this.em.findOneOrFail(RssSubscription, id);
    sub.url = updateRssDto.url;
    sub.state = updateRssDto.state == 'on' ? RssState.ON : RssState.OFF;
    await this.em.persistAndFlush(sub);
    return new RetrieveRssDto(sub);
  }

}
