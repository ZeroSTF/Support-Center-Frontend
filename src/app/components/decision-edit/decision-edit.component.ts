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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-decision-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './decision-edit.component.html',
  styleUrls: ['./decision-edit.component.css'],
})
export class DecisionEditComponent implements OnInit {
  decisionForm: FormGroup;
  decisionId: number = -1;
  currentUser: any;
  decision: any;

  constructor(
    private fb: FormBuilder,
    private decisionService: DecisionService,
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
    this.userService.get().subscribe((user) => {
      this.currentUser = user;
    });
    this.decisionId = +this.route.snapshot.paramMap.get('id')!;
    this.loadDecision();
  }

  loadDecision(): void {
    this.decisionService.getDecisionById(this.decisionId).subscribe(
      (data) => {
        this.decision = data;
        this.decisionForm.patchValue({
          description: data.description,
        });
      },
      (error) => {
        console.error('Error loading decision', error);
        this.snackBar.open('Error loading decision', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.decisionForm.valid) {
      this.decision.description = this.decisionForm.value.description;
      const reclamationId = this.decision.reclamation.id;
      this.decision.reclamation = null;

      this.decisionService
        .updateDecision(this.decision, reclamationId, this.currentUser.id)
        .subscribe(
          (response) => {
            this.snackBar.open('Decision updated successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/decisions']);
          },
          (error) => {
            console.error('Error updating decision', error);
            this.snackBar.open('Error updating decision', 'Close', {
              duration: 3000,
            });
          }
        );
    }
  }
}
