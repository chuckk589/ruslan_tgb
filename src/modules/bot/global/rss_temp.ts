import { EntityManager } from "@mikro-orm/core";
import { Inject, Injectable } from "@nestjs/common";
import { Bot } from "grammy";
import { BOT_NAME } from "src/constants";
import { BotContext } from "src/types/interfaces";
import Parser from 'rss-parser';
import { hash, compare } from "bcrypt";
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { RssSubscription, RssState } from "src/modules/mikroorm/entities/RssSubscription";


@Injectable()
export class tempService {
    constructor(private readonly em: EntityManager, @Inject(BOT_NAME) private bot: Bot<BotContext>, private readonly AppConfigService: AppConfigService) {
        this.shame();
    }

    parser = new Parser();

    shame = async () => {
        const rss = await this.getRssSubscriptions();
        const interval = this.AppConfigService.get('RSS_UPDATE_INTERVAL_MIN') < 10 ? 10 : this.AppConfigService.get('RSS_UPDATE_INTERVAL_MIN');
        for (const sub of rss) {
            try {
                const feed = await this.parser.parseURL(sub.url);
                const keys = feed.items.map((item) => item.id).join('')
                const hashed = await hash(keys, 6)
                if (!sub.updateHash || !await compare(keys, sub.updateHash)) { ///update
                    await this.updateRssSubscription(sub, hashed);
                    const message = feed.items.map((item) => {
                        return `
              ${item.link}
              `
                    }).join(' ')
                    await this.bot.api.sendMessage(sub.groupId, message, { parse_mode: 'HTML', ...sub.forumId ? { message_thread_id: Number(sub.forumId) } : {} })
                }
            } catch (error) {
                await this.bot.api.sendMessage(sub.groupId, error, { parse_mode: 'HTML', ...sub.forumId ? { message_thread_id: Number(sub.forumId) } : {} })
            }
        }
        setTimeout(this.shame, interval * 60 * 1000);
    }
    async getRssSubscriptions() {
        return await this.em.find(RssSubscription, { state: RssState.ON })
    }
    async updateRssSubscription(sub: RssSubscription, hashed: string) {
        sub.updateHash = hashed;
        await this.em.persistAndFlush(sub);
    }
}
