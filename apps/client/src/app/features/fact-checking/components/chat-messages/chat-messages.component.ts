import { Component, input, viewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { WelcomeMessageComponent } from '../welcome-message/welcome-message.component';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent, WelcomeMessageComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
})
export class ChatMessagesComponent {
  messages = input<ChatMessage[]>([]);
  scrollContainer = viewChild.required<ElementRef>('scrollContainer');

  constructor() {
    // Reactive scroll effect - scrolls when messages change
    effect(() => {
      const msgs = this.messages();
      if (msgs.length > 0) {
        this.scrollToBottom();
      }
    });
  }

  private scrollToBottom(): void {
    try {
      const container = this.scrollContainer();
      container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
    } catch {
      // Ignore scroll errors
    }
  }
}
