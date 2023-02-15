import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Locale, UserRole } from '../mikroorm/entities/User';
import { RetrieveStatusDto } from './dto/retrieve-status.dto';
import fs from 'fs';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import i18n from '../bot/middleware/i18n';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from '../mikroorm/entities/Config';

@Injectable()
export class StatusService {
  

  
  constructor(private readonly em: EntityManager) {}
  async findConfigs() {
    return await this.em.find('Config', {})
  }
  async updateConfig(id: number, updateConfigDto: UpdateConfigDto) {
    const config = await this.em.findOneOrFail(Config, id);
    updateConfigDto.category && (config.category = updateConfigDto.category);
    updateConfigDto.description && (config.description = updateConfigDto.description);
    updateConfigDto.value && (config.value = updateConfigDto.value);
    await this.em.persistAndFlush(config);
    return config;
  }
  updateLocales(updateLocaleDto: UpdateLocaleDto) {
    const existingLocale = updateLocaleDto.ru ? 'ru' : 'en';
    fs.writeFileSync(
      `./dist/modules/bot/locales/${existingLocale}.json`,
      JSON.stringify(updateLocaleDto[existingLocale]),
    );
    i18n.loadLocale(existingLocale, updateLocaleDto[existingLocale]);
  }
  async findLocales(): Promise<{ [key: string]: { [key: string]: string } }> {
    return {
      ru: JSON.parse(fs.readFileSync('./dist/modules/bot/locales/ru.json', 'utf8')),
      en: JSON.parse(fs.readFileSync('./dist/modules/bot/locales/en.json', 'utf8')),
    };
  }
  async findAll(): Promise<Record<string, RetrieveStatusDto[]>> {;
    return {
      locales: Object.values(Locale).map(
        (locale) => new RetrieveStatusDto({ value: locale, label: locale == 'ru' ? 'Русский' : 'Английский' }),
      ),
      roles: Object.values(UserRole).map(
        (role) => new RetrieveStatusDto({ value: role, label: role == 'user' ? 'Пользователь' : 'Администратор' }),
      ),
    };
  }
}
