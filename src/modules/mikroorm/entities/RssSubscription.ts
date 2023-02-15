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

export enum RssState {
  ON = 'on',
  OFF = 'off',
}

@Entity()
export class RssSubscription {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255 })
  groupId!: string;

  @Property({ length: 255 })
  title!: string;

  @Property({ length: 255 })
  url!: string;
  
  @Property({ length: 255, default: '0'})
  forumId?: string;

  @Enum({ items: () => RssState, default: RssState.OFF })
  state: RssState;

  @Property({ length: 255, nullable: true })
  updateHash?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

}
