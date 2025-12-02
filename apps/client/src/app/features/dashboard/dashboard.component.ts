import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '@supabase/supabase-js';
import { FormsModule } from '@angular/forms';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { AnalyticsChartComponent } from '../../shared/components/analytics-chart/analytics-chart.component';
import { IAnalyticsData } from '@compet-website/shared-types';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, catchError, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartCardComponent, AnalyticsChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  user$: Observable<User | null | undefined> = this.authService.currentUser$;
  formId = '1LfOKq1rRqfv-Ftk3_SCki7TTFm7ZkNzcOHSQGWcPGk4';

  private formIdSubject = new BehaviorSubject<string>(this.formId);

  analyticsData$: Observable<{ data: IAnalyticsData | null; loading: boolean; error: string | null }> = this.apiService.getAnalyticsStats().pipe(
    map(data => ({ data, loading: false, error: null })),
    catchError(err => {
      console.error('Error fetching analytics', err);
      return of({ data: null, loading: false, error: 'Impossible de charger les données Analytics (API non configurée ?)' });
    }),
    startWith({ data: null, loading: true, error: null })
  );

  statistics$: Observable<{ data: Record<string, Record<string, number>> | null; loading: boolean; error: string | null }> = this.formIdSubject.pipe(
    switchMap(formId => {
      if (!formId) {
        return of({ data: null, loading: false, error: null });
      }
      return this.apiService.getFormStatistics(formId).pipe(
        map(data => ({ data, loading: false, error: null })),
        catchError(err => {
          console.error('Error fetching statistics', err);
          return of({ data: null, loading: false, error: 'Erreur lors du chargement des statistiques. Vérifiez l\'ID du formulaire et les permissions.' });
        }),
        startWith({ data: null, loading: true, error: null })
      );
    })
  );

  onFormIdChange(newFormId: string) {
    this.formId = newFormId;
    this.formIdSubject.next(newFormId);
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}