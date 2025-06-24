import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBookingListComponent } from './employee-booking-list.component';

describe('EmployeeBookingListComponent', () => {
  let component: EmployeeBookingListComponent;
  let fixture: ComponentFixture<EmployeeBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
