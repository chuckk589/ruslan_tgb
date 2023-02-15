import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Ticket } from './Ticket';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export enum Locale {
  RU = 'ru',
  EN = 'en',
}

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property({ length: 255, nullable: true })
  chatId!: string;

  @Unique()
  @Property({ length: 255, nullable: true })
  username?: string;

  @Property({ length: 255, nullable: true })
  credentials?: string;

  @Enum({ items: () => Locale, default: Locale.RU })
  locale: Locale;

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role: UserRole;

  @Property({ nullable: true })
  phone?: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets = new Collection<Ticket>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

}
