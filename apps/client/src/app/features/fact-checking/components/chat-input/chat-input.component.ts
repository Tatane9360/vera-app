import {
  Component,
  output,
  viewChild,
  signal,
  ElementRef,
  inject,
} from '@angular/core';
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
  messageSent = output<{ text: string | null; file: File | null }>();

  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  inputText = signal('');
  errorMessage = signal('');
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);

  triggerFileInput() {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      input.value = '';
    }
  }

  removeFile() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
  }

  sendMessage() {
    const text = this.inputText().trim();
    const file = this.selectedFile();

    if (!text && !file) return;

    this.errorMessage.set('');

    // Emit combined event
    this.messageSent.emit({
      text: text || null,
      file: file || null,
    });

    // Reset state
    this.inputText.set('');
    this.removeFile();

    if (text) {
      // Enregistrer la question en base de données
      this.apiService.saveQuestion(text).subscribe({
        next: (response) => {
          console.log('✅ Question enregistrée:', response);
        },
        error: (error) => {
          console.error('❌ Erreur enregistrement:', error);
          // We don't block the UI for this background task
        },
      });
    }
  }

  adjustHeight(event: Event) {
    this.errorMessage.set('');
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
  }
}
