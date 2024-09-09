import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarUtils,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ExpertService } from '../../services/expert.service';
import { AvailabilityService } from '../../services/availability.service';
import { isSameDay, isSameMonth } from 'date-fns';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-expert-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CalendarModule,
  ],
  templateUrl: './expert-calendar.component.html',
  styleUrls: ['./expert-calendar.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
  ],
})
export class ExpertCalendarComponent implements OnInit {
  expertTypes: string[] = ['Doctor', 'Psychiatrist', 'Electrician'];
  selectedExpertType: string = '';
  experts: any[] = [];
  selectedExpert: any;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  isLoading: boolean = false;

  constructor(
    private expertService: ExpertService,
    private availabilityService: AvailabilityService,
    private snackBar: MatSnackBar,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onExpertTypeChange(): void {
    this.isLoading = true;
    this.expertService
      .getExpertsBySpecialization(this.selectedExpertType)
      .subscribe(
        (data) => {
          this.experts = data;
          this.isLoading = false;
          if (this.experts.length > 0) {
            this.selectedExpert = this.experts[0];
            this.loadAvailabilities();
          } else {
            this.snackBar.open(
              'No experts found for this specialization',
              'Close',
              { duration: 3000 }
            );
          }
        },
        (error) => {
          console.error('Error loading experts', error);
          this.snackBar.open('Error loading experts', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      );
  }

  onExpertChange(): void {
    this.loadAvailabilities();
  }

  loadAvailabilities(): void {
    this.isLoading = true;
    this.availabilityService
      .getAvailabilitiesByExpert(this.selectedExpert.id)
      .subscribe(
        (data) => {
          this.events = data.map((availability) => ({
            start: new Date(availability.startTime),
            end: new Date(availability.endTime),
            title: 'Available',
            color: { primary: '#1e90ff', secondary: '#D1E8FF' },
            meta: { availabilityId: availability.id },
          }));
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading availabilities', error);
          this.snackBar.open('Error loading availabilities', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      );
  }

  dayClicked({ day }: { day: any }): void {
    const { date, events } = day;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventClicked(event: CalendarEvent): void {
    // Extract availability details and pass it to the appointment service
    const availabilityId = event.meta.availabilityId;
    const expert = this.selectedExpert;
    const date = event.start;

    // Save the appointment details in the AppointmentService
    this.appointmentService.setAppointmentData({
      expert: expert,
      date: date,
      availabilityId: availabilityId,
    });

    console.log('the date is: ', new Date(date));
    // Navigate to the appointment form component
    this.router.navigate(['/appointment-form']);
  }
}
