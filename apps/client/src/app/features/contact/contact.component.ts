import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactFormDto } from '../../core/dtos/contact.dto';
import { IContactForm } from '@compet-website/shared-types';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  formData = signal<IContactForm>({
    name: '',
    email: '',
    message: '',
  });
  submitted = signal(false);

  onSubmit() {
    const dto = new ContactFormDto(this.formData());

    if (!dto.isValid()) {
      console.warn('Formulaire invalide');
      return;
    }

    this.submitted.set(true);
    console.log('Form submitted:', dto);

    setTimeout(() => {
      this.formData.set({ name: '', email: '', message: '' });
      this.submitted.set(false);
    }, 2000);
  }
}
