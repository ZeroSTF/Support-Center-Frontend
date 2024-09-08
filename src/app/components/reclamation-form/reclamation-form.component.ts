import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ReclamationService } from '../../services/reclamation.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamation-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './reclamation-form.component.html',
  styleUrl: './reclamation-form.component.css',
})
export class ReclamationFormComponent implements OnInit {
  reclamationForm: FormGroup;
  isEditMode = false;
  reclamationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.reclamationForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.reclamationId = +params['id'];
        this.loadReclamation(this.reclamationId);
      }
    });
  }

  loadReclamation(id: number): void {
    this.reclamationService.getReclamationById(id).subscribe(
      (reclamation) => {
        this.reclamationForm.patchValue({
          description: reclamation.description,
          date: new Date(reclamation.date),
          status: reclamation.status,
        });
      },
      (error) => console.error('Error loading reclamation:', error)
    );
  }

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const reclamationData = this.reclamationForm.value;

      this.userService.get().subscribe(
        (user: any) => {
          if (this.isEditMode && this.reclamationId) {
            this.reclamationService
              .updateReclamation({
                id: this.reclamationId,
                ...reclamationData,
                user: { id: user.id },
              })
              .subscribe(
                () => this.router.navigate(['/reclamations']),
                (error) => console.error('Error updating reclamation:', error)
              );
          } else {
            this.reclamationService
              .createReclamation(reclamationData, user.id)
              .subscribe(
                () => this.router.navigate(['/reclamations']),
                (error) => console.error('Error creating reclamation:', error)
              );
          }
        },
        (error: any) => console.error('Error getting current user:', error)
      );
    }
  }

  goTo(): void {
    this.router.navigate(['/reclamations']);
  }
}
