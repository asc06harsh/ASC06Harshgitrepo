import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/v1/bookings';

  constructor(private _http: HttpClient) { }

  postBooking(data: any) {
    return this._http.post(this.apiUrl, data);
  }

  getBooking() {
    return this._http.get(this.apiUrl);
  }

  deleteBooking(id: number) {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  updateBooking(id: number, data: any) {
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }
}
