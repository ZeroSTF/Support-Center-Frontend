import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpertService } from '../../services/expert.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

interface Expert {
  id: number;
  name: string;
  number: string;
  email: string;
  specialization: string;
}

@Component({
  selector: 'app-expert-list',
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
  templateUrl: './expert-list.component.html',
  styleUrl: './expert-list.component.css',
})
export class ExpertListComponent implements OnInit {
  experts: MatTableDataSource<Expert>;
  displayedColumns: string[] = [
    'name',
    'number',
    'email',
    'specialization',
    'actions',
  ];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private expertService: ExpertService,
    private snackBar: MatSnackBar
  ) {
    this.experts = new MatTableDataSource<Expert>([]);
  }

  ngOnInit(): void {
    this.loadExperts();
  }

  loadExperts(): void {
    this.isLoading = true;
    this.expertService.getAllExperts().subscribe(
      (data) => {
        this.experts.data = data;
        this.experts.paginator = this.paginator;
        this.experts.sort = this.sort;
        this.isLoading = false;
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

  deleteExpert(id: number): void {
    if (confirm('Are you sure you want to delete this expert?')) {
      this.expertService.deleteExpert(id).subscribe(
        () => {
          this.loadExperts();
          this.snackBar.open('Expert deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error deleting expert', error);
          this.snackBar.open('Error deleting expert', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.experts.filter = filterValue.trim().toLowerCase();

    if (this.experts.paginator) {
      this.experts.paginator.firstPage();
    }
  }
}
