import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';
import { ApiResponseDto } from '../../core/dtos/api.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
}
