import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DecisionService } from '../../services/decision.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-decision-list',
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
  templateUrl: './decision-list.component.html',
  styleUrl: './decision-list.component.css',
})
export class DecisionListComponent implements OnInit {
  decisions: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'description',
    'reclamationId',
    'adminId',
    'createdAt',
    'actions',
  ];
  isLoading = true;

  constructor(
    private decisionService: DecisionService,
    private snackBar: MatSnackBar
  ) {
    this.decisions = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadDecisions();
  }

  loadDecisions(): void {
    this.isLoading = true;
    this.decisionService.getAllDecisions().subscribe(
      (data) => {
        this.decisions.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading decisions', error);
        this.snackBar.open('Error loading decisions', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      }
    );
  }

  deleteDecision(id: number): void {
    if (confirm('Are you sure you want to delete this decision?')) {
      this.decisionService.deleteDecision(id).subscribe(
        () => {
          this.loadDecisions();
          this.snackBar.open('Decision deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error deleting decision', error);
          this.snackBar.open('Error deleting decision', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.decisions.filter = filterValue.trim().toLowerCase();
  }
}
