import { Component, OnInit, inject } from '@angular/core';
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
  imports: [
    CommonModule,
    FormsModule,
    ChartCardComponent,
    AnalyticsChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  user$: Observable<User | null | undefined> = this.authService.currentUser$;
  formId = '1LfOKq1rRqfv-Ftk3_SCki7TTFm7ZkNzcOHSQGWcPGk4';
  private formIdSubject = new BehaviorSubject<string>(this.formId);

  currentPage = 1;
  itemsPerPage = 10;
  totalQuestions = 0;
  questions: { id: string; question: string; createdAt: string }[] = [];
  loading = false;
  error: string | null = null;

  analyticsData$: Observable<{
    data: IAnalyticsData | null;
    loading: boolean;
    error: string | null;
  }> = this.apiService.getAnalyticsStats().pipe(
    map((data) => ({ data, loading: false, error: null })),
    catchError((err) => {
      console.error('Error fetching analytics', err);
      return of({
        data: null,
        loading: false,
        error:
          'Impossible de charger les données Analytics (API non configurée ?)',
      });
    }),
    startWith({ data: null, loading: true, error: null })
  );

  statistics$: Observable<{
    data: Record<string, Record<string, number>> | null;
    loading: boolean;
    error: string | null;
  }> = this.formIdSubject.pipe(
    switchMap((formId) => {
      if (!formId) {
        return of({ data: null, loading: false, error: null });
      }
      return this.apiService.getFormStatistics(formId).pipe(
        map((data) => ({ data, loading: false, error: null })),
        catchError((err) => {
          console.error('Error fetching statistics', err);
          return of({
            data: null,
            loading: false,
            error:
              "Erreur lors du chargement des statistiques. Vérifiez l'ID du formulaire et les permissions.",
          });
        }),
        startWith({ data: null, loading: true, error: null })
      );
    })
  );

  onFormIdChange(newFormId: string) {
    this.formId = newFormId;
    this.formIdSubject.next(newFormId);
  }

  ngOnInit() {
    console.log('Initialisation du composant Dashboard'); // Log
    this.loadQuestions();
  }

  loadQuestions() {
    console.log('Chargement des questions...'); // Log
    this.loading = true;
    this.error = null;

    this.apiService
      .getQuestions(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          console.log('Réponse reçue:', response); // Log
          this.questions = response.data;
          this.totalQuestions = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des questions:', error); // Log plus détaillé
          this.error =
            'Erreur lors du chargement des questions: ' + error.message;
          this.loading = false;
        },
      });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadQuestions();
    }
  }

  // Getter pour le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.totalQuestions / this.itemsPerPage);
  }

  // Getter pour générer les numéros de page à afficher
  get pages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 3; // Nombre maximum de boutons de page à afficher

    let startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);
    // Ajuster si on est près de la fin
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
