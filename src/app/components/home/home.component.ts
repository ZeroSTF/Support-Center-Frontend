import { Component } from '@angular/core';
import { User } from '../../models/User.types';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser$: Observable<User>;

  constructor(private userService: UserService) {
    this.currentUser$ = this.userService.user$;
  }

  ngOnInit(): void {
    // Fetch the current user data
    this.userService.get().subscribe();

    // Set up the observable for the current user
    this.currentUser$ = this.userService.user$;
  }
}
