import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDetailsComponent } from './reclamation-details.component';

describe('ReclamationDetailsComponent', () => {
  let component: ReclamationDetailsComponent;
  let fixture: ComponentFixture<ReclamationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
