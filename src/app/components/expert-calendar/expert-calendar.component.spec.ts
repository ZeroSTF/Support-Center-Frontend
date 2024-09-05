import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertCalendarComponent } from './expert-calendar.component';

describe('ExpertCalendarComponent', () => {
  let component: ExpertCalendarComponent;
  let fixture: ComponentFixture<ExpertCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
