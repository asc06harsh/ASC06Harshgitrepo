import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Feedback } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8080/api/v1/feedbacks';

  constructor(private http: HttpClient) {}

  postFeedback(data: Feedback) {
    return this.http.post<Feedback>(this.baseUrl, data);
  }

  getFeedback() {
    return this.http.get<Feedback[]>(this.baseUrl);
  }

  deleteFeedback(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateFeedback(id: number, data: Feedback) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
