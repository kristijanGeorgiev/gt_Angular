import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsRevenueComponent } from './reports-revenue.component';

describe('ReportsRevenueComponent', () => {
  let component: ReportsRevenueComponent;
  let fixture: ComponentFixture<ReportsRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsRevenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
