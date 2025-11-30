import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal<boolean>(false);

  constructor() {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode.set(savedTheme === 'dark');
    } else {
      this.darkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    // Apply theme whenever signal changes
    effect(() => {
      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.darkMode.update(d => !d);
  }
}
