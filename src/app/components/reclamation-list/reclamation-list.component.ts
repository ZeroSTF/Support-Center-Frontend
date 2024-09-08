import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ReclamationService } from '../../services/reclamation.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reclamation-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reclamation-list.component.html',
  styleUrl: './reclamation-list.component.css',
})
export class ReclamationListComponent implements OnInit {
  reclamations: any[] = [];
  isAdmin = false;
  currentUserId: number | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.get().subscribe(
      (user) => {
        this.isAdmin = user.role === 'admin';
        this.currentUserId = user.id;
        this.loadReclamations();
      },
      (error) => console.error('Error getting current user:', error)
    );
  }

  loadReclamations(): void {
    if (this.isAdmin) {
      this.reclamationService.getAllReclamations().subscribe(
        (data) => (this.reclamations = data),
        (error) => console.error('Error loading reclamations:', error)
      );
    } else if (this.currentUserId) {
      this.reclamationService
        .getReclamationsByUser(this.currentUserId)
        .subscribe(
          (data) => (this.reclamations = data),
          (error) => console.error('Error loading user reclamations:', error)
        );
    }
  }

  deleteReclamation(id: number): void {
    if (confirm('Are you sure you want to delete this reclamation?')) {
      this.reclamationService.deleteReclamation(id).subscribe(
        () => this.loadReclamations(),
        (error) => console.error('Error deleting reclamation:', error)
      );
    }
  }

  updateReclamation(id: number): void {
    this.router.navigate(['/reclamation/edit', id]);
  }

  makeDecision(id: number): void {
    this.router.navigate(['/reclamation', id, 'decide']);
  }

  goToDecision(id: number) {
    this.router.navigate(['/reclamation', id, 'decision']);
  }
}
