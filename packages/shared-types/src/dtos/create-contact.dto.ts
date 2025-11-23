import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IContactForm } from '../interfaces/contact.interface';

export class CreateContactDto implements IContactForm {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  message!: string;
}
