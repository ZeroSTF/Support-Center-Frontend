import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8080/reclamation';

  constructor(private http: HttpClient) {}

  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getReclamationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createReclamation(reclamation: any, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}?userId=${userId}`, reclamation);
  }

  updateReclamation(reclamation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, reclamation);
  }

  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getReclamationsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
