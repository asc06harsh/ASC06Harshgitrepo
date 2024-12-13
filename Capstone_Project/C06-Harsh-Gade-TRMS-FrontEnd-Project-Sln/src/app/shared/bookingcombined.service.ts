import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingCombinedData } from '../model/bookingcombined.model';

@Injectable({
  providedIn: 'root'
})
export class BookingCombinedService {
  private baseUrl: string = "http://localhost:8080/api/v1/bookingscombined"; // Spring Boot backend API

  constructor(private http: HttpClient) {}

  postBooking(data: BookingCombinedData): Observable<BookingCombinedData> {
    return this.http.post<BookingCombinedData>(this.baseUrl, data);
  }

  getBooking(): Observable<BookingCombinedData[]> {
    return this.http.get<BookingCombinedData[]>(this.baseUrl);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateBooking(id: number, data: BookingCombinedData): Observable<BookingCombinedData> {
    return this.http.put<BookingCombinedData>(`${this.baseUrl}/${id}`, data);
  }

  getAvailableTrips(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/trips');
  }

  getAvailableCabs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/cabs');
  }
}
