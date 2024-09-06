import { Routes } from '@angular/router';
import { NoAuthGuard } from './auth/guards/noAuth.guard';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';

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
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];
