import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';
import { SourceLinksComponent } from '../source-links/source-links.component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, SourceLinksComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  message = input.required<ChatMessage>();
}
