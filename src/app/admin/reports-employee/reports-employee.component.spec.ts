import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsEmployeeComponent } from './reports-employee.component';

describe('ReportsEmployeeComponent', () => {
  let component: ReportsEmployeeComponent;
  let fixture: ComponentFixture<ReportsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
