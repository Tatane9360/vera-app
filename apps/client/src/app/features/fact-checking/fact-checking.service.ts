import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalyzeResponseDto, AnalyzeUrlDto, VerifyClaimDto, VerifyResponseDto } from '@compet-website/shared-types';

@Injectable({
  providedIn: 'root',
})
export class FactCheckingService {
  private apiUrl = 'http://localhost:3000/api/fact-checking'; // Assuming global prefix is api, need to verify
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
