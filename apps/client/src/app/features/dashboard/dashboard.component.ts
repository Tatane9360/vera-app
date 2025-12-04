import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-[#111111] font-sans">
      <!-- Mobile Sidebar Overlay -->
      <div
        *ngIf="isSidebarOpen"
        class="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        (click)="closeSidebar()"
        (keyup.enter)="closeSidebar()"
        tabindex="0"
        role="button"
        aria-label="Close sidebar"
      ></div>

      <!-- Sidebar -->
      <app-dashboard-sidebar
        [user]="user$ | async"
        [isOpen]="isSidebarOpen"
        (logout)="logout()"
        (closeSidebar)="closeSidebar()"
      ></app-dashboard-sidebar>

      <!-- Main Content -->
      <main
        class="flex-1 ml-0 md:ml-64 p-4 md:p-8 bg-[#111111] text-white min-h-screen transition-all duration-300"
      >
        <!-- Mobile Header with Toggle -->
        <div class="md:hidden flex items-center mb-6">
          <button
            (click)="toggleSidebar()"
            class="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
          >
            <span class="material-icons-outlined text-2xl">menu</span>
          </button>
          <span class="ml-4 font-bold text-lg">Vera Dashboard</span>
        </div>

        <div class="max-w-7xl mx-auto">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user$: Observable<User | null | undefined> = this.authService.currentUser$;
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/tetan_aime_coder']);
  }
}
