import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBstComponent } from './reports-bst.component';

describe('ReportsBstComponent', () => {
  let component: ReportsBstComponent;
  let fixture: ComponentFixture<ReportsBstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsBstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsBstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
