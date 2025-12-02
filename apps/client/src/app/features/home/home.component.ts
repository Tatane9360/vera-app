import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';
import { ApiResponseDto } from '../../core/dtos/api.dto';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { SourcesSectionComponent } from './components/sources-section/sources-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HowItWorksComponent, SourcesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private apiService = inject(ApiService);

  apiData = toSignal<ApiResponseDto | null>(this.apiService.getData(), {
    initialValue: null,
  });
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadData();
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


  transformStyle = signal('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');

  onMouseMove(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    // Max rotation: 15 degrees
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    this.transformStyle.set(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  }
  
  onMouseLeave() {
     this.transformStyle.set('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  }
}
