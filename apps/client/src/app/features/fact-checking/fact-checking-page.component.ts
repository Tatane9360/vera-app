import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactCheckingService } from './fact-checking.service';
import { ChatMessage, SourceLink } from './models/chat-message.model';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';

@Component({
  selector: 'app-fact-checking-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent
  ],
  templateUrl: './fact-checking-page.component.html',
  styleUrl: './fact-checking-page.component.scss',
})
export class FactCheckingPageComponent {
  private factCheckingService = inject(FactCheckingService);

  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  onSendText(text: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (youtubeRegex.test(text)) {
      this.addMessage('user', text, 'url');
      this.processUrl(text);
    } else {
      this.addMessage('user', text, 'text');
      this.processText(text);
    }
  }

  onSendFile(file: File) {
    this.handleImageAnalysis(file);
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
      error: () => {
        this.removeMessage(loadingMsgId);
        this.addMessage('vera', 'Désolé, une erreur est survenue lors de l\'analyse de l\'image.', 'text');
        this.isLoading.set(false);
      }
    });
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
      error: () => {
        this.removeMessage(loadingMsgId);
        this.addMessage('vera', 'Désolé, une erreur est survenue lors de l\'analyse du lien YouTube.', 'text');
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
      error: () => {
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

  private extractLinks(text: string): SourceLink[] {
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
        console.error('Error extracting link:', e);
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
