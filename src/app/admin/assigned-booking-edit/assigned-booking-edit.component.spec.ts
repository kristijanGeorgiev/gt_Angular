import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedBookingEditComponent } from './assigned-booking-edit.component';

describe('AssignedBookingEditComponent', () => {
  let component: AssignedBookingEditComponent;
  let fixture: ComponentFixture<AssignedBookingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedBookingEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedBookingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
