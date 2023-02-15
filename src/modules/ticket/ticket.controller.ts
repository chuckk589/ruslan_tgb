import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller({
  path: 'ticket',
  version: '1',
})
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async findAll() {
    return await this.ticketService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return await this.ticketService.update(+id, updateTicketDto);
  }

}
