import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbacksDetailComponent } from './admin-feedbacks-detail.component';

describe('AdminFeedbacksDetailComponent', () => {
  let component: AdminFeedbacksDetailComponent;
  let fixture: ComponentFixture<AdminFeedbacksDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeedbacksDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbacksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
