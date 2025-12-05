import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';
import { ApiResponseDto } from '../../core/dtos/api.dto';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { SourcesSectionComponent } from './components/sources-section/sources-section.component';
import { InViewDirective } from '../../shared/directives/in-view.directive';
import { QuestionsSectionComponent } from './components/questions-section/questions-section.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HowItWorksComponent,
    QuestionsSectionComponent,
    SourcesSectionComponent,
    InViewDirective,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  styles: [
    `
      .highlighter-effect {
        background-image: linear-gradient(to right, #dbf9be, #dbf9be);
        background-size: 0% 100%;
        background-repeat: no-repeat;
        transition: background-size 2s cubic-bezier(0.22, 1, 0.36, 1);
        padding: 0 0.2em;
      }

      .highlighter-effect.in-view {
        background-size: 100% 100%;
      }

      :host-context(.dark) .highlighter-effect {
        background-image: linear-gradient(to right, #dbf9be, #dbf9be);
        color: #111111;
      }

      @media (prefers-reduced-motion: reduce) {
        .highlighter-effect {
          transition: none;
        }
      }
    `,
  ],
})
export class HomeComponent {
  private apiService = inject(ApiService);

  apiData = toSignal<ApiResponseDto | null>(this.apiService.getData(), {
    initialValue: null,
  });
  loading = signal(false);
  error = signal<string | null>(null);
  prefersReducedMotion = signal(false);

  constructor() {
    this.loadData();
    this.checkReducedMotion();
  }

  loadData() {
    this.loading.set(true);
    this.error.set(null);
    this.apiService.getData().subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          'Erreur lors de la connexion au serveur. Assurez-vous que le serveur est démarré sur le port 3000.'
        );
        this.loading.set(false);
        console.error('Erreur API:', err);
      },
    });
  }

  checkReducedMotion() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion.set(mediaQuery.matches);
      
      mediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion.set(e.matches);
      });
    }
  }

  transformStyle = signal(
    'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  );

  onMouseMove(event: MouseEvent) {
    if (this.prefersReducedMotion()) {
      return;
    }

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    this.transformStyle.set(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  }

  onMouseLeave() {
    if (this.prefersReducedMotion()) {
      return;
    }

    this.transformStyle.set(
      'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    );
  }

  onDemoClick(event: Event) {
    event.preventDefault();
    console.log('Demo video would open here');
  }
}
