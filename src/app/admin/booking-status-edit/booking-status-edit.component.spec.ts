import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusEditComponent } from './booking-status-edit.component';

describe('BookingStatusEditComponent', () => {
  let component: BookingStatusEditComponent;
  let fixture: ComponentFixture<BookingStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingStatusEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
