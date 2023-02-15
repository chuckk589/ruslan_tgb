import { Menu } from '@grammyjs/menu';
import { Locale } from 'src/modules/mikroorm/entities/User';
import { BotStep } from 'src/types/enums';
import { BaseComposer, BotContext } from 'src/types/interfaces';
import { Command, ComposerController, On, Use } from '../common/decorators';
import { label } from '../common/helpers';
import { globalService } from './global.service';
import { Router } from '@grammyjs/router';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import Fuse from 'fuse.js'
import i18n from '../middleware/i18n';

@ComposerController
export class globalComposer extends BaseComposer {
  constructor(
    private readonly globalService: globalService,
    private readonly AppConfigService: AppConfigService,
    @InjectPinoLogger('globalComposer') private readonly logger: PinoLogger,
  ) {
    super();
  }
  fuse = new Fuse([i18n.t('ru', 'info_site'), i18n.t('ru', 'chat'), i18n.t('ru', 'market'), i18n.t('ru', 'info_channel'), i18n.t('ru', 'support'), i18n.t('ru', 'link'), i18n.t('ru', 'info')], {});

  @Use()
  menu = new Menu<BotContext>('main-menu').dynamic((ctx, range) => {
    switch (ctx.session.step) {
      case BotStep.default: {
        range.text(label({ text: "chat" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('chat_content'));
        });
        range.text(label({ text: "market" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('market_content'));
        }).row();
        range.text(label({ text: "support" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('support_content'));
        });
        range.text(label({ text: "link" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('link_content'));
        }).row();
        range.text(label({ text: "info_site" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('info_site_content'));
        }).row();
        range.text(label({ text: "info_channel" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('info_channel_content'));
        }).row();
        range.text(label({ text: "info" }), async (ctx) => {
          await ctx.reply(ctx.i18n.t('info_content'));
        }).row();
        break;
      }
    }
    return range;
  });


  @Command('start')
  start = async (ctx: BotContext) => {
    ctx.session.step = BotStep.default;
    const user = await this.globalService.getUser(ctx);
    ctx.i18n.locale(user.locale);
    await ctx.reply(ctx.i18n.t('start'), {
      reply_markup: this.menu,
    });

  };


  @Command('rss')
  rss = async (ctx: BotContext) => {
    if (ctx.chat.type == 'group' || ctx.chat.type == 'supergroup') {
      const sub = await this.globalService.getRssSubscription(ctx);
      if (sub) {
        await this.globalService.toggleRssSubscription(sub);
        await ctx.reply(ctx.i18n.t('rss_toggled', { state: sub.state }), ctx.message.message_thread_id ? { message_thread_id: ctx.message.message_thread_id } : {})
      }
      else {
        await ctx.reply(ctx.i18n.t('ask_rss'), ctx.message.message_thread_id ? { message_thread_id: ctx.message.message_thread_id } : {});
        ctx.session.step = BotStep.url;
      }
    }
  }

  @Use()
  router = new Router<BotContext>((ctx: BotContext) => ctx.session.step)
    .route(
      BotStep.default,
      async (ctx: BotContext) => {
        if (ctx.chat.type == 'private') {
          if (ctx.message && ctx.message.text && ctx.message.text[0] == '@') {
            await this.globalService.createTicket(ctx);
            await ctx.reply(ctx.i18n.t('ticket_created'));
            return;
          } else {
            const fuzzy = this.fuse.search(ctx.message.text, { limit: 1 });
            if (fuzzy.length > 0) {
              const keys = Object.keys(i18n.repository.ru);
              const key = keys.find((key) => i18n.t('ru', key) == fuzzy[0].item);
              await ctx.reply(ctx.i18n.t('fuzzy_search', { result: ctx.i18n.t(key) , value: ctx.i18n.t(`${key}_content`)}));
            }
          }
        }
      },
    ).route(
      BotStep.url,
      async (ctx: BotContext) => {
        if (ctx.message) {
          await this.globalService.createRssSubscription(ctx);
          await ctx.reply(ctx.i18n.t('rss_subscribed'), ctx.message.message_thread_id ? { message_thread_id: ctx.message.message_thread_id } : {})
          ctx.session.step = BotStep.default;
        }
      },
    );
}
