import { Module } from '@nestjs/common';
import { globalComposer } from './global.composer';
import { globalService } from './global.service';
import { tempService } from './rss_temp';

@Module({
  imports: [],
  providers: [globalService, globalComposer, tempService],
  exports: [globalComposer],
})
export class globalModule { }
