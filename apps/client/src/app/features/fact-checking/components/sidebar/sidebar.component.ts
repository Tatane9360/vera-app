import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Conversation } from '../../services/history.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public themeService = inject(ThemeService);
  conversations = input<Conversation[]>([]);
  currentConversationId = input<string | null>(null);

  selectConversation = output<string>();
  newChat = output<void>();
  deleteConversation = output<string>();
  closeSidebar = output<void>();

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
