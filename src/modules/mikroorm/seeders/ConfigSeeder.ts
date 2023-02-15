import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Config } from '../entities/Config';

export class ConfigSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Config, {
      name: 'ADMIN_PASSCODE',
      value: '$2a$12$rok.MCu02SSWKkSuTRhwdudPl4N6QQl0sRRBf1vyTaxLiw14TwR6i',
    });
    em.create(Config, {
      name: 'BOT_TOKEN_PROD',
      value: '1892460280:AAGMm7mrof7DhQN4BTLPWttcqEAaDjroGHI',
    });
    em.create(Config, {
      name: 'RSS_UPDATE_INTERVAL_MIN',
      value: '10',
    });
  }
}
