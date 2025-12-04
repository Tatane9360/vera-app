import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ChartCardComponent } from '../../../../shared/components/chart-card/chart-card.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-survey-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartCardComponent],
  template: `
    <div class="space-y-8">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-vera-green flex items-center justify-center text-primary"
        >
          <span class="material-icons-outlined text-xl">poll</span>
        </div>
        <h1 class="text-3xl font-bold text-white">Données du sondage</h1>
      </div>

      <ng-container *ngIf="statistics$ | async as stats">
        <!-- Search / Filter -->
        <div class="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label
                for="formIdInput"
                class="block text-sm font-medium text-gray-400 mb-2"
                >ID du Formulaire Google</label
              >
              <input
                id="formIdInput"
                type="text"
                [(ngModel)]="formId"
                placeholder="Entrez l'ID du formulaire..."
                class="w-full bg-[#111111] text-white border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-vera-green focus:border-transparent outline-none transition-all"
              />
            </div>
            <div class="flex items-end">
              <button
                (click)="onFormIdChange(formId)"
                [disabled]="stats.loading || !formId"
                class="bg-vera-green text-primary px-8 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all h-[50px]"
              >
                {{ stats.loading ? 'Chargement...' : 'Analyser' }}
              </button>
            </div>
          </div>

          <div
            *ngIf="stats.error"
            class="mt-4 bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-xl flex items-center gap-3"
          >
            <span class="material-icons-outlined">error_outline</span>
            {{ stats.error }}
          </div>
        </div>

        <!-- Stats Grid -->
        <div
          *ngIf="stats.data"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ng-container *ngFor="let question of stats.data | keyvalue">
            <app-chart-card
              [title]="question.key"
              [data]="question.value"
              class="h-full"
            ></app-chart-card>
          </ng-container>
        </div>

        <!-- Empty State -->
        <div
          *ngIf="!stats.data && !stats.loading && !stats.error"
          class="text-center py-12 opacity-50"
        >
          <span class="material-icons-outlined text-6xl text-gray-600 mb-4"
            >analytics</span
          >
          <p class="text-gray-400 text-lg">
            Entrez un ID de formulaire pour voir les statistiques
          </p>
        </div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class SurveyDataComponent {
  private apiService = inject(ApiService);

  formId = '1LfOKq1rRqfv-Ftk3_SCki7TTFm7ZkNzcOHSQGWcPGk4';
  private formIdSubject = new BehaviorSubject<string>(this.formId);

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
              "Erreur lors du chargement des statistiques. Vérifiez l'ID du formulaire.",
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
}
