import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpertService {
  private apiUrl = 'http://localhost:8080/expert';

  constructor(private http: HttpClient) {}

  createExpert(expert: any): Observable<any> {
    return this.http.post(this.apiUrl, expert);
  }

  getExpertById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllExperts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getExpertsBySpecialization(specialization: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/specialization?specialization=${specialization}`
    );
  }

  updateExpert(expert: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, expert);
  }

  deleteExpert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
