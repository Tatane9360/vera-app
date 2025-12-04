import { Component, output, viewChild, signal, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
})
export class ChatInputComponent {
  private apiService = inject(ApiService);
  
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

    this.errorMessage.set('');
    
    // Enregistrer la question en base de données
    this.apiService.saveQuestion(text).subscribe({
      next: (response) => {
        console.log('✅ Question enregistrée:', response);
        this.sendText.emit(text); // Émet le message
        this.inputText.set('');
      },
      error: (error) => {
        console.error('❌ Erreur enregistrement:', error);
        this.errorMessage.set('Erreur lors de l\'enregistrement');
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