import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'http://localhost:8080/availability';

  constructor(private http: HttpClient) { }

  createAvailability(availability: any): Observable<any> {
    return this.http.post(this.apiUrl, availability);
  }

  getAvailabilitiesByExpert(expertId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expert/${expertId}`);
  }

  isExpertAvailable(expertId: number, dateTime: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check?expertId=${expertId}&dateTime=${dateTime}`);
  }

  deleteAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}