import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBookingComponent } from './reports-booking.component';

describe('ReportsBookingComponent', () => {
  let component: ReportsBookingComponent;
  let fixture: ComponentFixture<ReportsBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
