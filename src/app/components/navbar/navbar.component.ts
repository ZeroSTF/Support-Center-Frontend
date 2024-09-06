import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatToolbarModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.hasRole('ADMIN').subscribe(
      (hasRole) => {
        this.isAdmin = hasRole;
      },
      (error) => {
        console.error('Error checking role:', error);
      }
    );
  }
}
