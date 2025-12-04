import { Component, inject } from '@angular/core';
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

      <!-- Stats Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
        *ngIf="stats$ | async as stats"
      >
        <app-stat-card
          *ngFor="let stat of stats"
          [title]="stat.title"
          [value]="stat.value"
          [percentage]="stat.percentage"
          [data]="stat.data"
        ></app-stat-card>
      </div>
    </div>
  `,
})
export class DashboardHomeComponent {
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

  stats$ = this.periodSubject.pipe(
    switchMap((period) =>
      this.apiService.getAnalyticsStats(period.startDate, 'today')
    ),
    map((data) => {
      const activeUsers = data.datasets.activeUsers.reduce((a, b) => a + b, 0);
      const pageViews = data.datasets.pageViews.reduce((a, b) => a + b, 0);
      const sessions = data.datasets.sessions.reduce((a, b) => a + b, 0);

      return [
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
    })
  );

  setPeriod(period: Period) {
    this.selectedPeriod = period;
    this.periodSubject.next(period);
  }
}
