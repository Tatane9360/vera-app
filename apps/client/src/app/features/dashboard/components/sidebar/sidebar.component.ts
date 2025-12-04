import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-gray-800 flex flex-col text-gray-400 font-sans transition-transform duration-300 ease-in-out transform md:translate-x-0"
      [class.-translate-x-full]="!isOpen"
    >
      <!-- Logo -->
      <div class="p-6 flex items-center justify-between text-white">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 bg-vera-green rounded-lg flex items-center justify-center text-black font-bold text-xl"
          >
            V
          </div>
          <span class="font-bold text-xl tracking-wide">Vera</span>
        </div>

        <!-- Close Button (Mobile) -->
        <button
          (click)="onClose()"
          class="md:hidden text-gray-400 hover:text-white transition-colors"
        >
          <span class="material-icons-outlined">close</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 space-y-2 mt-4">
        <a
          routerLink="/flo_le_meilleur_prof"
          routerLinkActive="bg-gray-800 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="onClose()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-colors group cursor-pointer"
        >
          <span
            class="material-icons-outlined text-xl group-hover:text-vera-green transition-colors"
            >dashboard</span
          >
          <span class="font-medium">Dashboard</span>
        </a>

        <a
          routerLink="/flo_le_meilleur_prof/survey-data"
          routerLinkActive="bg-gray-800 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="onClose()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 hover:text-white transition-colors group cursor-pointer"
        >
          <span
            class="material-icons-outlined text-xl group-hover:text-vera-green transition-colors"
            >layers</span
          >
          <span class="font-medium">Données du sondage</span>
        </a>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-gray-800">
        <div
          class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer group"
        >
          <div
            class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-transparent group-hover:border-vera-green transition-colors"
          >
            <img
              src="/images/avatar.png"
              alt="User"
              class="w-full h-full object-cover"
              onerror="this.src='https://ui-avatars.com/api/?name=User&background=random'"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">Identifiant</p>
            <p class="text-xs text-gray-500 truncate">Administrateur</p>
          </div>
          <button
            (click)="onLogout()"
            class="text-gray-500 hover:text-red-400 transition-colors"
          >
            <span class="material-icons-outlined">logout</span>
          </button>
        </div>
      </div>
    </aside>
  `,
  styles: [],
})
export class SidebarComponent {
  @Input() user: User | null | undefined = null;
  @Input() isOpen = false;
  @Output() logout = new EventEmitter<void>();
  @Output() closeSidebar = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }

  onClose() {
    this.closeSidebar.emit();
  }
}
