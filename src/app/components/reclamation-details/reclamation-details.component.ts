import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../../services/reclamation.service';
import { DecisionService } from '../../services/decision.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reclamation-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.css'],
})
export class ReclamationDetailsComponent implements OnInit {
  reclamationId: number = -1;
  reclamation: any;
  decision: any;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private decisionService: DecisionService
  ) {}

  ngOnInit(): void {
    this.reclamationId = +this.route.snapshot.paramMap.get('id')!;
    this.loadReclamation();
    this.loadDecision();
  }

  loadReclamation(): void {
    this.reclamationService.getReclamationById(this.reclamationId).subscribe(
      (data) => {
        this.reclamation = data;
      },
      (error) => {
        console.error('Error loading reclamation', error);
      }
    );
  }

  loadDecision(): void {
    this.decisionService.getDecisionByRecId(this.reclamationId).subscribe(
      (data) => {
        this.decision = data;
      },
      (error) => {
        console.error('Error loading decision', error);
      }
    );
  }
}
