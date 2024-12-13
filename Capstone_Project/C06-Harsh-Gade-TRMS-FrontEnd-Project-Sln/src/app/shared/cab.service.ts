import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CabData } from '../model/cab.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/v1/cabs';  

  constructor(private http: HttpClient) { }

  // Get all cab data
  getCabData(): Observable<CabData[]> {
    return this.http.get<CabData[]>(this.apiUrl);
  }

  // Post new cab data
  postCabData(cabData: CabData): Observable<CabData> {
    return this.http.post<CabData>(this.apiUrl, cabData);
  }

  // Update existing cab data
  updateCabData(id: number, cabData: CabData): Observable<CabData> {
    return this.http.put<CabData>(`${this.apiUrl}/${id}`, cabData);
  }

  // Delete a specific cab data by id
  deleteCabData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
