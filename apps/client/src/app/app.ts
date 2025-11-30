import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from '@supabase/supabase-js';
import { IconComponent } from './shared/components/icon/icon.component';
import { ThemeService } from './services/theme.service';

@Component({
  imports: [RouterModule, CommonModule, IconComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  public themeService = inject(ThemeService);

  protected title = 'client';
  user: User | null = null;

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }
}