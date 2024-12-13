import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://localhost:8080/api/v1/trips";

  constructor(private http: HttpClient) {}

  postTrip(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  getTrip(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateTrip(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }
}
