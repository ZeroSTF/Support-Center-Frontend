import { Routes } from '@angular/router';
import { NoAuthGuard } from './auth/guards/noAuth.guard';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ReclamationFormComponent } from './components/reclamation-form/reclamation-form.component';
import { ReclamationListComponent } from './components/reclamation-list/reclamation-list.component';
import { DecisionFormComponent } from './components/decision-form/decision-form.component';
import { DecisionListComponent } from './components/decision-list/decision-list.component';
import { ExpertListComponent } from './components/expert-list/expert-list.component';
import { DecisionEditComponent } from './components/decision-edit/decision-edit.component';
import { ReclamationDetailsComponent } from './components/reclamation-details/reclamation-details.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ExpertCalendarComponent } from './components/expert-calendar/expert-calendar.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home' },
  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      {
        path: 'sign-in',
        component: SigninComponent,
      },
      {
        path: 'sign-up',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'reclamations', component: ReclamationListComponent },
      { path: 'reclamation/new', component: ReclamationFormComponent },
      { path: 'reclamation/edit/:id', component: ReclamationFormComponent },

      { path: 'reclamation/:id/decide', component: DecisionFormComponent },
      {
        path: 'reclamation/:id/decision',
        component: ReclamationDetailsComponent,
      },
      { path: 'decisions', component: DecisionListComponent },
      { path: 'decision/edit/:id', component: DecisionEditComponent },

      { path: 'experts', component: ExpertListComponent },
      { path: 'calendar', component: ExpertCalendarComponent },

      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointment-form', component: AppointmentFormComponent },
    ],
  },
];
