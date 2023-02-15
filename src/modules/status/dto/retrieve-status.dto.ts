import { Locale, User } from 'src/modules/mikroorm/entities/User';

export class RetrieveStatusDto {
  constructor(
    payload: { id?: number; label?: string; value: string },
  ) {
    this.title = payload.label
    this.comment = null;
    this.value = 'id' in payload ? payload.id.toString() : payload.value;
  }
  title: string;
  value: string;
  comment?: string;
}
