import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversation } from '../../services/history.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  conversations = input<Conversation[]>([]);
  currentConversationId = input<string | null>(null);

  selectConversation = output<string>();
  newChat = output<void>();
  deleteConversation = output<string>();

  onSelect(id: string) {
    this.selectConversation.emit(id);
  }

  onNewChat() {
    this.newChat.emit();
  }

  onDelete(event: Event, id: string) {
    event.stopPropagation();
    this.deleteConversation.emit(id);
  }
}
