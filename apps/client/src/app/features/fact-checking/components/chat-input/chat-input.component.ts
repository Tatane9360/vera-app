import { Component, output, viewChild, signal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  // Modern Angular signals-based outputs
  sendText = output<string>();
  sendFile = output<File>();
  
  // ViewChild with signal
  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  // Reactive state
  inputText = signal('');

  triggerFileInput() {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.sendFile.emit(file);
      input.value = ''; // Reset
    }
  }

  sendMessage() {
    const text = this.inputText().trim();
    if (!text) return;
    
    this.sendText.emit(text);
    this.inputText.set('');
  }
}
