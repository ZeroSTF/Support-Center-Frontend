import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointment';
  private appointmentData: any = null;

  constructor(private http: HttpClient) {}

  setAppointmentData(data: any): void {
    this.appointmentData = data;
  }

  getAppointmentData(): any {
    return this.appointmentData;
  }

  clearAppointmentData(): void {
    this.appointmentData = null;
  }

  createAppointment(
    appointment: any,
    userId: number,
    expertId: number
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}?userId=${userId}&expertId=${expertId}`,
      appointment
    );
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAppointmentsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAppointmentsByExpert(expertId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expert/${expertId}`);
  }

  updateAppointment(appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
