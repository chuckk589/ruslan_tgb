import { Ticket, TicketStatus } from "src/modules/mikroorm/entities/Ticket";

export class RetrieveTicketDto {
  constructor(ticket: Ticket) {
    this.id = ticket.id.toString();
    this.chatId = ticket.user.chatId;
    this.username = ticket.user.username;
    this.createdAt = ticket.createdAt;
    this.object = ticket.object;
    this.response = ticket.response;
    this.status = ticket.status == TicketStatus.PENDING ? 'Ожидает ответа' : 'Обработан';
  }
  id: string;
  chatId: string;
  username: string;
  object: string;
  response: string;
  status: string;
  createdAt: Date;
}
