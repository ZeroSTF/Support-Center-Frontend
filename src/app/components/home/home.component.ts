import { Component } from '@angular/core';
import { User } from '../../models/User.types';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isAdmin: boolean = false;
  currentUser$: Observable<User>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.authService.hasRole('admin').subscribe(
      (hasRole) => {
        this.isAdmin = hasRole;
      },
      (error) => {
        console.error('Error checking role:', error);
      }
    );
    // Fetch the current user data
    this.userService.get().subscribe();

    // Set up the observable for the current user
    this.currentUser$ = this.userService.user$;
  }
}
