import { BotContext } from 'src/types/interfaces';
import i18n from '../middleware/i18n';

export function match(key: string): RegExp {
  const locales: string[] = i18n.availableLocales();
  return new RegExp(locales.map((l) => `^${i18n.t(l, key)}$`).join('|'));
}

export const label = (payload: { text: string; payload?: string }) => {
  return (ctx: BotContext) => ctx.i18n.t(payload.text);
};


export const getRandomArrayValues = <T>(arr: T[], count: number): T[] => {
  const shuffled = arr.slice(0);
  const result = [];
  while (result.length < count) {
    const random = Math.floor(Math.random() * shuffled.length);
    result.push(shuffled[random]);
    shuffled.splice(random, 1);
  }
  return result;
};
