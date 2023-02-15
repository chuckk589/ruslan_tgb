import { RssState, RssSubscription } from "src/modules/mikroorm/entities/RssSubscription";


export class RetrieveRssDto {
  constructor(rss: RssSubscription) {
    this.id = rss.id.toString();
    this.groupId = rss.groupId
    this.forumId = rss.forumId
    this.state = rss.state == RssState.ON ? 'On' : 'Off';
    this.createdAt = rss.createdAt;
    this.url = rss.url;
    this.title = rss.title;
  }
  id: string;
  groupId: string;
  forumId: string;
  state: string;
  url: string;
  title: string;
  createdAt: Date;
}
