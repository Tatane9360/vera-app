import { Component, output, viewChild, signal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
})
export class ChatInputComponent {
  sendText = output<string>();
  sendFile = output<File>();
  
  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  inputText = signal('');
  errorMessage = signal('');

  triggerFileInput() {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.sendFile.emit(file);
      input.value = ''; 
    }
  }

  sendMessage() {
    const text = this.inputText().trim();
    if (!text) return;

    const blockedDomains = ['instagram.com', 'instagr.am', 'tiktok.com', 'facebook.com', 'fb.com'];
    const hasBlockedLink = blockedDomains.some(domain => text.toLowerCase().includes(domain));

    if (hasBlockedLink) {
      this.errorMessage.set("Les liens provenant de réseaux sociaux (Instagram, TikTok, Facebook) ne sont pas autorisés.");
      return;
    }
    
    this.errorMessage.set(''); 
    this.sendText.emit(text);
    this.inputText.set('');
    
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    });
  }

  adjustHeight(event: Event) {
    this.errorMessage.set(''); 
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'; 
  }
}
