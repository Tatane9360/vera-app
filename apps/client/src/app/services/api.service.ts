import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from '@compet-website/shared-types';
import { ApiResponseDto } from '../core/dtos/api.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  getData(): Observable<ApiResponseDto> {
    return this.http.get<IApiResponse>(`${this.apiUrl}`).pipe(
      map((response) => new ApiResponseDto(response))
    );
  }
}
