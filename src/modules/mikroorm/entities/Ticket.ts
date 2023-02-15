import {
  BeforeCreate,
  Collection,
  Entity,
  Enum,
  EventArgs,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';

export enum TicketStatus {
  PENDING = 'pending',
  ANSWERED = 'answered',
}

@Entity()
export class Ticket extends CustomBaseEntity {
  
  @PrimaryKey()
  id!: number;

  @Property({ length: 512 })
  object!: string;

  @Property({ length: 512, nullable: true })
  response?: string;

  @ManyToOne(() => User)
  user!: User;

  @Enum({ items: () => TicketStatus, default: TicketStatus.PENDING })
  status: TicketStatus;

}
