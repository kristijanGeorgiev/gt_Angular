import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusAddComponent } from './booking-status-add.component';

describe('BookingStatusAddComponent', () => {
  let component: BookingStatusAddComponent;
  let fixture: ComponentFixture<BookingStatusAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingStatusAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingStatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
