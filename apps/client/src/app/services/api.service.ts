import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnalyticsData, IApiResponse } from '@compet-website/shared-types';
import { ApiResponseDto } from '../core/dtos/api.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getData(): Observable<ApiResponseDto> {
    return this.http.get<IApiResponse>(`${this.apiUrl}`).pipe(
      map((response) => new ApiResponseDto(response))
    );
  }

  getFormResponses(formId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forms/${formId}/responses`);
  }

  getFormStatistics(formId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forms/${formId}/statistics`);
  }

  getAnalyticsStats(startDate = '7daysAgo', endDate = 'today'): Observable<IAnalyticsData> {
    return this.http.get<IAnalyticsData>(`${this.apiUrl}/analytics/stats`, {
      params: { startDate, endDate }
    });
  }

  saveQuestion(question: string) {
    console.log('Envoi de la question au serveur:', question); 
    return this.http.post(`${environment.apiUrl}/api/questions`, { question });
  }

  getQuestions(page = 1, limit = 10) {
    console.log('Récupération des questions, page:', page); 
    return this.http.get<{
      data: {id: string, question: string, createdAt: string}[],
      total: number
    }>(`${environment.apiUrl}/api/questions`, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      } 
    });
  }


}