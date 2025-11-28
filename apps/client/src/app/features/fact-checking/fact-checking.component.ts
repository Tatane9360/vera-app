import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FactCheckingService } from './fact-checking.service';

interface ChatMessage {
  id: string;
  role: 'user' | 'vera';
  content: string;
  type: 'text' | 'image' | 'url';
  imagePreview?: string;
  links?: { url: string; domain: string; favicon: string }[];
  isLoading?: boolean;
}

@Component({
  selector: 'app-fact-checking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fact-checking.component.html',
  styleUrl: './fact-checking.component.scss',
})
export class FactCheckingComponent implements AfterViewChecked {
  private factCheckingService = inject(FactCheckingService);
  
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  messages = signal<ChatMessage[]>([]);
  inputText = signal('');
  isLoading = signal(false);

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleImageAnalysis(file);
      input.value = ''; // Reset
    }
  }

  async handleImageAnalysis(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      this.addMessage('user', 'Analyse de l\'image...', 'image', preview);
      this.processImage(file);
    };
    reader.readAsDataURL(file);
  }

  processImage(file: File) {
    this.isLoading.set(true);
    const loadingMsgId = this.addLoadingMessage();

    this.factCheckingService.analyzeImage(file).subscribe({
      next: (response) => {
        this.removeMessage(loadingMsgId);
        const verification = response.verification || response.text;
        this.addVeraResponse(verification);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.removeMessage(loadingMsgId);
        this.addMessage('vera', 'Désolé, une erreur est survenue lors de l\'analyse de l\'image.', 'text');
        this.isLoading.set(false);
      }
    });
  }

  sendMessage() {
    const text = this.inputText().trim();
    if (!text) return;

    this.inputText.set('');
    
    // Check if URL
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (urlRegex.test(text)) {
      this.addMessage('user', text, 'url');
      this.processUrl(text);
    } else {
      this.addMessage('user', text, 'text');
      this.processText(text);
    }
  }

  processUrl(url: string) {
    this.isLoading.set(true);
    const loadingMsgId = this.addLoadingMessage();

    this.factCheckingService.analyzeUrl(url).subscribe({
      next: (response) => {
        this.removeMessage(loadingMsgId);
        const verification = response.verification || response.text;
        this.addVeraResponse(verification);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.removeMessage(loadingMsgId);
        this.addMessage('vera', 'Désolé, une erreur est survenue lors de l\'analyse du lien.', 'text');
        this.isLoading.set(false);
      }
    });
  }

  processText(text: string) {
    this.isLoading.set(true);
    const loadingMsgId = this.addLoadingMessage();

    this.factCheckingService.verifyClaim(text).subscribe({
      next: (response) => {
        this.removeMessage(loadingMsgId);
        this.addVeraResponse(response.result);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.removeMessage(loadingMsgId);
        this.addMessage('vera', 'Désolé, une erreur est survenue lors de la vérification.', 'text');
        this.isLoading.set(false);
      }
    });
  }

  private addMessage(role: 'user' | 'vera', content: string, type: 'text' | 'image' | 'url', imagePreview?: string): string {
    const id = Date.now().toString() + Math.random().toString();
    this.messages.update(msgs => [...msgs, {
      id,
      role,
      content,
      type,
      imagePreview
    }]);
    return id;
  }

  private addLoadingMessage(): string {
    const id = Date.now().toString() + Math.random().toString();
    this.messages.update(msgs => [...msgs, {
      id,
      role: 'vera',
      content: 'Analyse en cours...',
      type: 'text',
      isLoading: true
    }]);
    return id;
  }

  private removeMessage(id: string) {
    this.messages.update(msgs => msgs.filter(m => m.id !== id));
  }

  private addVeraResponse(text: string) {
    const links = this.extractLinks(text);
    this.messages.update(msgs => [...msgs, {
      id: Date.now().toString(),
      role: 'vera',
      content: text,
      type: 'text',
      links
    }]);
  }

  private extractLinks(text: string) {
    if (!text) return [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex) || [];
    
    const links = matches.map(url => {
      try {
        let cleanUrl = url;
        // Recursively remove trailing punctuation that are likely not part of the URL
        while (/[.,;)!?\]]$/.test(cleanUrl)) {
          cleanUrl = cleanUrl.slice(0, -1);
        }
        
        const urlObj = new URL(cleanUrl);
        return {
          url: cleanUrl,
          domain: urlObj.hostname,
          favicon: `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`
        };
      } catch (e) {
        return null;
      }
    }).filter((link): link is NonNullable<typeof link> => link !== null);

    return links.filter((link, index, self) =>
      index === self.findIndex((t) => (
        t.url === link.url
      ))
    );
  }
}
