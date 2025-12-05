import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactCheckingService } from './fact-checking.service';
import { ChatMessage, SourceLink } from './models/chat-message.model';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HistoryService, Conversation } from './services/history.service';

@Component({
  selector: 'app-fact-checking-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent,
    SidebarComponent,
  ],
  templateUrl: './fact-checking-page.component.html',
  styleUrl: './fact-checking-page.component.scss',
})
export class FactCheckingPageComponent implements OnInit {
  private factCheckingService = inject(FactCheckingService);
  private historyService = inject(HistoryService);

  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  // History State
  conversations = signal<Conversation[]>([]);
  currentConversationId = signal<string | null>(null);
  isSidebarOpen = signal(true); // Default open on desktop

  ngOnInit() {
    this.loadHistory();
    this.startNewChat();
    if (window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }

  loadHistory() {
    this.conversations.set(this.historyService.getHistory());
  }

  startNewChat() {
    this.currentConversationId.set(null);
    this.messages.set([]);
  }

  selectConversation(id: string) {
    const conversation = this.historyService.getConversation(id);
    if (conversation) {
      this.currentConversationId.set(id);
      this.messages.set(conversation.messages);
      // On mobile, close sidebar after selection
      if (window.innerWidth < 1024) {
        this.isSidebarOpen.set(false);
      }
    }
  }

  deleteConversation(id: string) {
    const newHistory = this.historyService.deleteConversation(id);
    this.conversations.set(newHistory);

    if (this.currentConversationId() === id) {
      this.startNewChat();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  private saveCurrentConversation() {
    const msgs = this.messages();
    if (msgs.length === 0) return;

    let id = this.currentConversationId();
    let title = 'Nouvelle conversation';

    // If it's a new chat, generate ID and Title from the first user message
    if (!id) {
      id = Date.now().toString();
      const firstUserMsg = msgs.find((m) => m.role === 'user');
      if (firstUserMsg) {
        title = this.historyService.generateTitle(firstUserMsg.content);
      }
      this.currentConversationId.set(id);
    } else {
      // Keep existing title
      const existing = this.historyService.getConversation(id);
      if (existing) title = existing.title;
    }

    const conversation: Conversation = {
      id,
      title,
      createdAt: Date.now(), // Update timestamp on save? Or keep original? Let's keep original creation time logic if we had it, but for now simple.
      messages: msgs,
    };

    this.historyService.saveConversation(conversation);
    this.loadHistory(); // Refresh list
  }

  // --- Message Handling Wrappers ---

  onSendMessage(event: { text: string | null; file: File | null }) {
    if (event.file) {
      this.handleImageAnalysis(event.file, event.text);
    } else if (event.text) {
      this.onSendText(event.text);
    }
  }

  onSendText(text: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (youtubeRegex.test(text)) {
      this.addMessage('user', text, 'url');
      this.processUrl(text);
    } else {
      this.addMessage('user', text, 'text');
      this.processText(text);
    }
    this.saveCurrentConversation();
  }

  // kept for compatibility if needed, but unused by template now
  onSendFile(file: File) {
    this.handleImageAnalysis(file, null);
  }

  async handleImageAnalysis(file: File, text: string | null) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      const content = text || "Analyse de l'image...";
      this.addMessage('user', content, 'image', preview);
      this.processImage(file, text);
      this.saveCurrentConversation();
    };
    reader.readAsDataURL(file);
  }

  processImage(file: File, text: string | null) {
    this.isLoading.set(true);
    const loadingMsgId = this.addLoadingMessage();

    this.factCheckingService.analyzeImage(file, text || undefined).subscribe({
      next: (response) => {
        this.removeMessage(loadingMsgId);
        const verification = response.verification || response.text;
        this.addVeraResponse(verification);
        this.isLoading.set(false);
        this.saveCurrentConversation();
      },
      error: () => {
        this.removeMessage(loadingMsgId);
        this.addMessage(
          'vera',
          "Désolé, une erreur est survenue lors de l'analyse de l'image.",
          'text'
        );
        this.isLoading.set(false);
        this.saveCurrentConversation();
      },
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
        this.saveCurrentConversation();
      },
      error: () => {
        this.removeMessage(loadingMsgId);
        this.addMessage(
          'vera',
          "Désolé, une erreur est survenue lors de l'analyse du lien YouTube.",
          'text'
        );
        this.isLoading.set(false);
        this.saveCurrentConversation();
      },
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
        this.saveCurrentConversation();
      },
      error: () => {
        this.removeMessage(loadingMsgId);
        this.addMessage(
          'vera',
          'Désolé, une erreur est survenue lors de la vérification.',
          'text'
        );
        this.isLoading.set(false);
        this.saveCurrentConversation();
      },
    });
  }

  private addMessage(
    role: 'user' | 'vera',
    content: string,
    type: 'text' | 'image' | 'url',
    imagePreview?: string
  ): string {
    const id = Date.now().toString() + Math.random().toString();
    this.messages.update((msgs) => [
      ...msgs,
      {
        id,
        role,
        content,
        type,
        imagePreview,
      },
    ]);
    return id;
  }

  private addLoadingMessage(): string {
    const id = Date.now().toString() + Math.random().toString();
    this.messages.update((msgs) => [
      ...msgs,
      {
        id,
        role: 'vera',
        content: 'Analyse en cours...',
        type: 'text',
        isLoading: true,
      },
    ]);
    return id;
  }

  private removeMessage(id: string) {
    this.messages.update((msgs) => msgs.filter((m) => m.id !== id));
  }

  private addVeraResponse(text: string) {
    const links = this.extractLinks(text);
    this.messages.update((msgs) => [
      ...msgs,
      {
        id: Date.now().toString(),
        role: 'vera',
        content: text,
        type: 'text',
        links,
      },
    ]);
  }

  private extractLinks(text: string): SourceLink[] {
    if (!text) return [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex) || [];

    const links = matches
      .map((url) => {
        try {
          let cleanUrl = url;
          while (/[.,;)!?\]]$/.test(cleanUrl)) {
            cleanUrl = cleanUrl.slice(0, -1);
          }

          const urlObj = new URL(cleanUrl);
          return {
            url: cleanUrl,
            domain: urlObj.hostname,
            favicon: `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`,
          };
        } catch (e) {
          console.error('Error extracting link:', e);
          return null;
        }
      })
      .filter((link): link is NonNullable<typeof link> => link !== null);

    return links.filter(
      (link, index, self) => index === self.findIndex((t) => t.url === link.url)
    );
  }
}
