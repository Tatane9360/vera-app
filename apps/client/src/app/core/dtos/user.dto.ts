import { IUser } from '@compet-website/shared-types';

export class UserDto implements IUser {
  id: number;
  name: string;
  email: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name.trim();
    this.email = data.email.toLowerCase();
  }

  getDisplayName(): string {
    return `${this.name} (${this.email})`;
  }
}
