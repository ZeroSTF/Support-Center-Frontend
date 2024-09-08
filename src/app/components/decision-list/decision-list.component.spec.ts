import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionListComponent } from './decision-list.component';

describe('DecisionListComponent', () => {
  let component: DecisionListComponent;
  let fixture: ComponentFixture<DecisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
