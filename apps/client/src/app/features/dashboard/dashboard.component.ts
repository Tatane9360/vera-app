import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '@supabase/supabase-js';
import { FormsModule } from '@angular/forms';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  user: User | null = null;
  formId = '1LfOKq1rRqfv-Ftk3_SCki7TTFm7ZkNzcOHSQGWcPGk4'; 
  responses: any = null;
  statistics: Record<string, Record<string, number>> | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  fetchResponses() {
    if (!this.formId) return;
    
    this.loading = true;
    this.error = null;
    this.apiService.getFormStatistics(this.formId).subscribe({
      next: (data) => {
        this.statistics = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching statistics', err);
        this.error = 'Erreur lors du chargement des statistiques. Vérifiez l\'ID du formulaire et les permissions.';
        this.loading = false;
      }
    });
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}