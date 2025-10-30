// @ts-nocheck
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  id: number;
  advisorId: number;
  farmerId: number;
  comment: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/v1/reviews';

  constructor(private http: HttpClient) {}

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createReview(advisorId: number, rating: number, comment: string): Observable<Review> {
    const farmerId = this.getFarmerId();
    return this.http.post<Review>(this.baseUrl, { advisorId, farmerId, rating, comment }, { headers: this.getAuthHeaders() });
  }

  updateReview(id: number, rating: number, comment: string): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}/${id}`, { rating, comment }, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getFarmerId(): number {
    return Number(localStorage.getItem('farmerId')) || 1;
  }
}
