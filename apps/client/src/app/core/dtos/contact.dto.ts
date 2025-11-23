
import { IContactForm } from '@compet-website/shared-types';

export class ContactFormDto implements IContactForm {
  name: string;
  email: string;
  message: string;

  constructor(data: IContactForm) {
    this.name = data.name.trim();
    this.email = data.email.toLowerCase().trim();
    this.message = data.message.trim();
  }

  isValid(): boolean {
    return (
      this.name.length > 0 &&
      this.email.length > 0 &&
      this.message.length > 0 &&
      this.email.includes('@')
    );
  }
}
