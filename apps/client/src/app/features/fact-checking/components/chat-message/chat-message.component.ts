import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';
import { SourceLinksComponent } from '../source-links/source-links.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, SourceLinksComponent, IconComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  message = input.required<ChatMessage>();
  copied = signal(false);
  themeService = inject(ThemeService);

  async shareMessage() {
    const content = this.message().content;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vérification Vera',
          text: content,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(content);
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }
}
