import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMessage[];
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly STORAGE_KEY = 'vera_chat_history';

  getHistory(): Conversation[] {
    const history = localStorage.getItem(this.STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  }

  saveConversation(conversation: Conversation): void {
    const history = this.getHistory();
    const index = history.findIndex((c) => c.id === conversation.id);

    if (index >= 0) {
      history[index] = conversation;
    } else {
      history.unshift(conversation); // Add to the top
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  deleteConversation(id: string): Conversation[] {
    const history = this.getHistory().filter((c) => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return history;
  }

  getConversation(id: string): Conversation | undefined {
    return this.getHistory().find((c) => c.id === id);
  }

  generateTitle(message: string): string {
    return message.length > 30 ? message.substring(0, 30) + '...' : message;
  }
}
