import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateConfigDto } from './dto/update-config.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { StatusService } from './status.service';

@Controller({
  path: 'status',
  version: '1',
})
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }
  @Get('/locales')
  findLocales() {
    return this.statusService.findLocales();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/reboot')
  reboot() {
    return process.exit();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/configs')
  findConfigs() {
    return this.statusService.findConfigs();
  }

  @UseGuards(JwtAuthGuard)
  @Put('/configs/:id')
  updateConfig(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.statusService.updateConfig(+id, updateConfigDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/locales')
  updateLocales(@Body() updateLocaleDto: UpdateLocaleDto) {
    return this.statusService.updateLocales(updateLocaleDto);
  }
}
