import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { BotModule } from './modules/bot/bot.module';
import { MikroORM } from '@mikro-orm/core';
import { Config } from './modules/mikroorm/entities/Config';
import { globalComposer } from './modules/bot/global/global.composer';
import { globalModule } from './modules/bot/global/global.module';
import { BaseComposer } from './types/interfaces';
import checkTime from './modules/bot/middleware/checkTime';
import i18n from './modules/bot/middleware/i18n';
import { session } from './modules/bot/middleware/session';
import { LoggerModule } from 'nestjs-pino';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StatusModule } from './modules/status/status.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { RssModule } from './modules/rss/rss.module';
import ORMOptionsProvider from 'src/configs/mikro-orm.config';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    MikroOrmModule.forRoot(ORMOptionsProvider),
    BotModule.forRootAsync({
      imports: [globalModule],
      inject: [MikroORM, globalComposer],
      useFactory: async (orm: MikroORM, ...composers: BaseComposer[]) => {
        const config = await orm.em.findOne(Config, {
          name: 'BOT_TOKEN_PROD',
        });
        return {
          token: config.value,
          middleware: [session, checkTime, i18n.middleware(), ...composers.map((c) => c.getMiddleware())],
        };
      },
    }),
    LoggerModule.forRoot({ pinoHttp: { autoLogging: false } }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, './', 'public/') }),
    UserModule,
    AuthModule,
    StatusModule,
    TicketModule,
    RssModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
