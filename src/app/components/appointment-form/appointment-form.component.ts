import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpertService } from '../../services/expert.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  currentUser: any;
  experts: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private expertService: ExpertService
  ) {
    this.appointmentForm = this.fb.group({
      expert: [''],
      date: [''],
      availabilityId: [''],
    });
  }

  ngOnInit(): void {
    // Get the experts
    this.expertService
      .getAllExperts()
      .subscribe((experts) => (this.experts = experts));
    // Get the current user
    this.userService.get().subscribe((user) => {
      this.currentUser = user;
    });

    // Retrieve the appointment data from the service
    const appointmentData = this.appointmentService.getAppointmentData();

    if (appointmentData) {
      this.appointmentForm.patchValue({
        expert: appointmentData.expert.name, // or ID
        date: appointmentData.date,
        availabilityId: appointmentData.availabilityId,
      });
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment = {
        date: this.appointmentForm.value.date,
        //user: this.currentUser, // The logged-in user
      };

      // Call service to save the appointment
      this.appointmentService
        .createAppointment(
          appointment,
          this.currentUser.id,
          this.appointmentForm.value.expert
        )
        .subscribe(
          (response) => {
            this.snackBar.open('Appointment successfully booked', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/calendar']); // Navigate back to calendar after success
          },
          (error) => {
            console.error('Error adding appointment', error);
            this.snackBar.open('Error booking appointment', 'Close', {
              duration: 3000,
            });
          }
        );
    }
  }
}
