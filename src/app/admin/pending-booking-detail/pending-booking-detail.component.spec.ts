import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBookingDetailComponent } from './pending-booking-detail.component';

describe('PendingBookingDetailComponent', () => {
  let component: PendingBookingDetailComponent;
  let fixture: ComponentFixture<PendingBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingBookingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
