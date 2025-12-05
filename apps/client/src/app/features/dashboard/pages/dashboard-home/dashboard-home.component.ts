import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { User } from '@supabase/supabase-js';
import { Observable, map, BehaviorSubject, switchMap } from 'rxjs';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';

interface Period {
  label: string;
  value: string;
  startDate: string;
}

interface Question {
  id: string;
  question: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  template: `
    <div class="space-y-6 md:space-y-8">
      <!-- Header -->
      <div class="space-y-3 md:space-y-4">
        <h1 class="text-xl md:text-3xl font-bold text-white break-words">
          Bonjour, <br class="md:hidden" />{{ (user$ | async)?.email }}
        </h1>
        <p class="text-sm md:text-base text-gray-400">
          Suivez toutes les données de la Vera web :
        </p>

        <!-- Date Filter -->
        <div
          class="inline-flex bg-[#1E1E1E] p-1 rounded-lg border border-gray-800 w-full md:w-auto overflow-x-auto"
        >
          <button
            *ngFor="let period of periods"
            (click)="setPeriod(period)"
            [class.bg-gray-700]="selectedPeriod === period"
            [class.text-white]="selectedPeriod === period"
            [class.shadow-sm]="selectedPeriod === period"
            [class.text-gray-400]="selectedPeriod !== period"
            [class.hover:text-white]="selectedPeriod !== period"
            class="flex-1 md:flex-none px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap"
          >
            {{ period.label }}
          </button>
        </div>
      </div>

      <!-- Stats & Geo Data -->
      <ng-container *ngIf="dashboardData$ | async as data">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <app-stat-card
            *ngFor="let stat of data.stats"
            [title]="stat.title"
            [value]="stat.value"
            [percentage]="stat.percentage"
            [data]="stat.data"
          ></app-stat-card>
        </div>

        <!-- Geo Data Section -->
        <div class="mt-8" *ngIf="data.geoData && data.geoData.length > 0">
          <h2 class="text-xl md:text-2xl font-bold text-white mb-4">
            Répartition Géographique
          </h2>
          <div class="bg-[#1E1E1E] border border-gray-800 rounded-lg p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                *ngFor="let item of data.geoData | slice : 0 : 9"
                class="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gray-700/50"
              >
                <div class="flex items-center gap-3">
                  <span class="text-gray-300 font-medium">{{
                    item.country
                  }}</span>
                </div>
                <span
                  class="text-white font-bold bg-primary/20 px-2 py-1 rounded text-sm text-primary"
                >
                  {{ item.activeUsers }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- Questions Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl md:text-2xl font-bold text-white">
            Questions des utilisateurs
          </h2>
          <span class="text-sm text-gray-400" *ngIf="questionsData">
            Total: {{ questionsData.total }}
          </span>
        </div>

        <!-- Questions List -->
        <div class="space-y-3">
          <div
            *ngIf="!questionsData || questionsData.data.length === 0"
            class="bg-[#1E1E1E] border border-gray-800 rounded-lg p-6 text-center"
          >
            <p class="text-gray-400">Aucune question pour le moment</p>
          </div>

          <div
            *ngFor="let question of questionsData?.data"
            class="bg-[#1E1E1E] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
          >
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <p class="text-white text-sm md:text-base flex-1">
                {{ question.question }}
              </p>
              <span class="text-xs text-gray-500">
                {{ formatDate(question.createdAt) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          *ngIf="questionsData && questionsData.total > pageSize"
          class="flex items-center justify-center gap-2 mt-6"
        >
          <button
            (click)="previousPage()"
            [disabled]="currentPage === 1"
            [class.opacity-50]="currentPage === 1"
            [class.cursor-not-allowed]="currentPage === 1"
            class="px-4 py-2 bg-[#1E1E1E] border border-gray-800 rounded-lg text-white hover:border-gray-700 transition-colors disabled:hover:border-gray-800"
          >
            Précédent
          </button>
          <span class="text-gray-400 text-sm">
            Page {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            (click)="nextPage()"
            [disabled]="currentPage >= totalPages"
            [class.opacity-50]="currentPage >= totalPages"
            [class.cursor-not-allowed]="currentPage >= totalPages"
            class="px-4 py-2 bg-[#1E1E1E] border border-gray-800 rounded-lg text-white hover:border-gray-700 transition-colors disabled:hover:border-gray-800"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DashboardHomeComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);

  user$: Observable<User | null | undefined> = this.authService.currentUser$;

  periods = [
    { label: "Aujourd'hui", value: 'today', startDate: 'today' },
    { label: 'Semaine', value: 'week', startDate: '7daysAgo' },
    { label: 'Mois', value: 'month', startDate: '30daysAgo' },
    { label: 'Année', value: 'year', startDate: '365daysAgo' },
  ];

  selectedPeriod = this.periods[1]; // Default to Week
  private periodSubject = new BehaviorSubject(this.selectedPeriod);

  dashboardData$ = this.periodSubject.pipe(
    switchMap((period) =>
      this.apiService.getAnalyticsStats(period.startDate, 'today')
    ),
    map((data) => {
      const activeUsers = data.datasets.activeUsers.reduce(
        (a: number, b: number) => a + b,
        0
      );
      const pageViews = data.datasets.pageViews.reduce(
        (a: number, b: number) => a + b,
        0
      );
      const sessions = data.datasets.sessions.reduce(
        (a: number, b: number) => a + b,
        0
      );

      const stats = [
        {
          title: 'Utilisateurs Actifs',
          value: activeUsers.toLocaleString(),
          percentage: 12,
          data: data.datasets.activeUsers,
        },
        {
          title: 'Vues de la page',
          value: pageViews.toLocaleString(),
          percentage: 8,
          data: data.datasets.pageViews,
        },
        {
          title: 'Sessions',
          value: sessions.toLocaleString(),
          percentage: 24,
          data: data.datasets.sessions,
        },
      ];

      return { stats, geoData: data.geoData };
    })
  );

  // Questions data
  questionsData: { data: Question[]; total: number } | null = null;
  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return this.questionsData
      ? Math.ceil(this.questionsData.total / this.pageSize)
      : 1;
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.apiService.getQuestions(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.questionsData = data;
        console.log('Questions chargées:', data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des questions:', error);
      },
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadQuestions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadQuestions();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;

    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }

  setPeriod(period: Period) {
    this.selectedPeriod = period;
    this.periodSubject.next(period);
  }
}
