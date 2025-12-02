import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styles: []
})
export class NavBarComponent {
  public authService = inject(AuthService);
  public themeService = inject(ThemeService);
  private router = inject(Router);

  isScrolled = signal(false);
  user = signal<User | null | undefined>(undefined);

  constructor() {
    this.authService.currentUser$.subscribe(u => this.user.set(u));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return !!this.user();
  }
}
