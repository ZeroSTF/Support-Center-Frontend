import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {
  private apiUrl = 'http://localhost:8080/decision';

  constructor(private http: HttpClient) { }

  createDecision(decision: any, reclamationId: number, adminId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}?reclamationId=${reclamationId}&adminId=${adminId}`, decision);
  }

  getDecisionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllDecisions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateDecision(decision: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, decision);
  }

  deleteDecision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}