import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { ReclamationService } from '../../services/reclamation.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-decision-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './decision-form.component.html',
  styleUrl: './decision-form.component.css',
})
export class DecisionFormComponent implements OnInit {
  decisionForm: FormGroup;
  reclamationId: number = -1;
  reclamation: any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private decisionService: DecisionService,
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.decisionForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.reclamationId = +this.route.snapshot.paramMap.get('id')!;
    this.loadReclamation();
  }

  loadReclamation(): void {
    this.reclamationService.getReclamationById(this.reclamationId).subscribe(
      (data) => {
        this.reclamation = data;
      },
      (error) => {
        console.error('Error loading reclamation', error);
        this.snackBar.open('Error loading reclamation', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.decisionForm.valid) {
      const decision = this.decisionForm.value;
      this.userService.get().subscribe((user) => {
        this.currentUser = user;
      });
      const adminId = this.currentUser.id;

      this.decisionService
        .createDecision(decision, this.reclamationId, adminId)
        .subscribe(
          (response) => {
            this.snackBar.open('Decision submitted successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/decisions']);
          },
          (error) => {
            console.error('Error submitting decision', error);
            this.snackBar.open('Error submitting decision', 'Close', {
              duration: 3000,
            });
          }
        );
    }
  }
}
