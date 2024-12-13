import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentData } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'http://localhost:8080/api/v1/payments';  // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  /**
   * Create a new payment
   * @param data - PaymentData object
   * @returns Observable<PaymentData>
   */
  postPayment(data: PaymentData): Observable<PaymentData> {
    return this.http.post<PaymentData>(this.apiUrl, data);
  }

  /**
   * Fetch all payments
   * @returns Observable<PaymentData[]>
   */
  getPayment(): Observable<PaymentData[]> {
    return this.http.get<PaymentData[]>(this.apiUrl);
  }

  /**
   * Delete a payment by ID
   * @param id - Payment ID
   * @returns Observable<void>
   */
  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update a payment by ID
   * @param id - Payment ID
   * @param data - Updated PaymentData object
   * @returns Observable<PaymentData>
   */
  updatePayment(id: number, data: PaymentData): Observable<PaymentData> {
    return this.http.put<PaymentData>(`${this.apiUrl}/${id}`, data);
  }
}
