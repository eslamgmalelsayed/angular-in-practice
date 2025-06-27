import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@/environments/environment';
// Models
import type { ApiResponse } from '@/app/models/api-response.model';
// Services
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  get<T>(endpoint: string = ''): Observable<ApiResponse<T>> {
    return this.http
      .get<{ ok: boolean; description: T[]; error_code: number }>(
        `${this.baseUrl}${endpoint}`
      )
      .pipe(
        map((response) => ({
          ...response,
          data: response.description,
        })),
        catchError((error) => this.errorHandler.handleError(error))
      );
  }
}
