import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    RouterModule,
    MatSpinner,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  appointments: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'userName', 'expertName', 'actions'];
  isLoading = true;
  isAdmin: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {
    this.appointments = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.isLoading = true;
    this.appointmentService.getAllAppointments().subscribe(
      (data) => {
        this.appointments.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading appointments', error);
        this.snackBar.open('Error loading appointments', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      }
    );
  }

  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(
        () => {
          this.loadAppointments();
          this.snackBar.open('Appointment deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error deleting appointment', error);
          this.snackBar.open('Error deleting appointment', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.appointments.filter = filterValue.trim().toLowerCase();
  }
}
