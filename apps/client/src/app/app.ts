import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from '@supabase/supabase-js';
import { IconComponent } from './shared/components/icon/icon.component';
import { ThemeService } from './services/theme.service';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  imports: [RouterModule, CommonModule, IconComponent, NavBarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  public themeService = inject(ThemeService);

  protected title = 'client';
  user: User | null | undefined = undefined;

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