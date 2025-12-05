import { Component, HostListener, inject, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { User } from '@supabase/supabase-js';
import { IconComponent } from '../icon/icon.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './nav-bar.component.html',
  styles: [],
})
export class NavBarComponent implements AfterViewInit {
  public authService = inject(AuthService);
  public themeService = inject(ThemeService);
  private router = inject(Router);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  user = signal<User | null | undefined>(undefined);
  ariaLiveMessage = signal('');
  currentRoute = signal('');

  @ViewChild('mobileMenuToggle') mobileMenuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenuOverlay') mobileMenuOverlay?: ElementRef<HTMLDivElement>;

  private focusableElementsSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  private lastFocusedElement: HTMLElement | null = null;

  constructor() {
    this.authService.currentUser$.subscribe((u) => this.user.set(u));
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute.set(event.urlAfterRedirects);
        }
      });
  }

  ngAfterViewInit() {
    this.currentRoute.set(this.router.url);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
    
    if (this.isMobileMenuOpen()) {
      this.lastFocusedElement = document.activeElement as HTMLElement;
      
      document.body.style.overflow = 'hidden';
      
      this.announceToScreenReader('Menu de navigation ouvert');
      
      setTimeout(() => this.trapFocus(), 100);
    } else {
      document.body.style.overflow = '';
      
      this.announceToScreenReader('Menu de navigation fermé');
      
      this.restoreFocus();
    }
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
      document.body.style.overflow = '';
      this.announceToScreenReader('Menu de navigation fermé');
      this.restoreFocus();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isMobileMenuOpen()) {
      event.preventDefault();
      this.closeMobileMenu();
      return;
    }

    if (!this.isMobileMenuOpen()) return;

    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    if (!this.mobileMenuOverlay) return;

    const focusableElements = Array.from(
      this.mobileMenuOverlay.nativeElement.querySelectorAll(this.focusableElementsSelector)
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private trapFocus() {
    if (!this.mobileMenuOverlay) return;

    const focusableElements = this.mobileMenuOverlay.nativeElement.querySelectorAll(
      this.focusableElementsSelector
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  private restoreFocus() {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    } else if (this.mobileMenuToggle) {
      this.mobileMenuToggle.nativeElement.focus();
    }
  }

  toggleTheme(isDark: boolean) {
    this.themeService.darkMode.set(isDark);
    const themeName = isDark ? 'sombre' : 'clair';
    this.announceToScreenReader(`Thème ${themeName} activé`);
  }

  private announceToScreenReader(message: string) {
    this.ariaLiveMessage.set(message);
    // Clear message after announcement
    setTimeout(() => this.ariaLiveMessage.set(''), 1000);
  }

  async logout() {
    await this.authService.signOut();
    this.announceToScreenReader('Déconnexion réussie');
    this.router.navigate(['/tetan_aime_coder']);
  }

  get isAuthenticated(): boolean {
    return !!this.user();
  }

  isCurrentRoute(route: string, fragment?: string): boolean {
    const currentUrl = this.currentRoute();
    if (fragment) {
      return currentUrl === route || currentUrl === `${route}#${fragment}`;
    }
    return currentUrl === route;
  }
}
