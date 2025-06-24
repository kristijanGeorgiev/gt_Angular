import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedBookingsComponent } from './assigned-bookings.component';

describe('AssignedBookingsComponent', () => {
  let component: AssignedBookingsComponent;
  let fixture: ComponentFixture<AssignedBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
