import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignedBookingComponent } from './employee-assigned-booking.component';

describe('EmployeeAssignedBookingComponent', () => {
  let component: EmployeeAssignedBookingComponent;
  let fixture: ComponentFixture<EmployeeAssignedBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeAssignedBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAssignedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
