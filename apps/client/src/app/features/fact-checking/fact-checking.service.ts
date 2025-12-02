import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalyzeResponseDto, AnalyzeUrlDto, VerifyClaimDto, VerifyResponseDto } from '@compet-website/shared-types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FactCheckingService {
  private apiUrl = `${environment.apiUrl}/fact-checking`; 
  private http = inject(HttpClient);

  analyzeImage(file: File): Observable<AnalyzeResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<AnalyzeResponseDto>(`${this.apiUrl}/analyze-image`, formData);
  }

  analyzeUrl(url: string): Observable<AnalyzeResponseDto> {
    return this.http.post<AnalyzeResponseDto>(`${this.apiUrl}/analyze-url`, { url } as AnalyzeUrlDto);
  }

  verifyClaim(query: string): Observable<VerifyResponseDto> {
    return this.http.post<VerifyResponseDto>(`${this.apiUrl}/verify`, { query } as VerifyClaimDto);
  }
}
