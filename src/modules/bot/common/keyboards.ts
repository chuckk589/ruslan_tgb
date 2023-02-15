import { Keyboard } from 'grammy';
import { InlineKeyboardMarkup } from 'grammy/out/types';
import { BotContext } from 'src/types/interfaces';
import i18n from '../middleware/i18n';

// keyboards
export const mainKeyboard = (ctx: BotContext): Keyboard => {
  return new Keyboard()
    .text(ctx.i18n.t('participate'))
    .text(ctx.i18n.t('rules'))
    .text(ctx.i18n.t('about'))
    .row()
    .text(ctx.i18n.t('myChecks'))
    .text(ctx.i18n.t('prizes'))
    .text(ctx.i18n.t('winners'))
    .row()
    .text(ctx.i18n.t('contacts'))
    .text(ctx.i18n.t('switchLanguage'));
};

//inline keyboards
// export const mainMenu = (ctx: BotContext): InlineKeyboardMarkup => {
//   return {
//     inline_keyboard: [
//       [
//         { callback_data: 'chat', text: ctx.i18n.t('chat') },
//         { callback_data: 'market', text: ctx.i18n.t('market') },
//       ],
//       [
//         { callback_data: 'support', text: ctx.i18n.t('support') },
//         { callback_data: 'link', text: ctx.i18n.t('link') },
//       ],
//       [
//         { callback_data: 'info_site', text: ctx.i18n.t('info_site') },
//       ],
//       [
//         { callback_data: 'info_channel', text: ctx.i18n.t('info_channel') },
//       ],

//       [
//         { callback_data: 'info', text: ctx.i18n.t('info') },
//       ],
//     ],
//   };
// };