import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBookingNoteComponent } from './employee-booking-note.component';

describe('EmployeeBookingNoteComponent', () => {
  let component: EmployeeBookingNoteComponent;
  let fixture: ComponentFixture<EmployeeBookingNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBookingNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBookingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
