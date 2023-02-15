import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { RssService } from './rss.service';
import { UpdateRssDto } from './dto/update-rss.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({
  path: 'rss',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get()
  findAll() {
    return this.rssService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRssDto: UpdateRssDto) {
    return this.rssService.update(+id, updateRssDto);
  }

}
