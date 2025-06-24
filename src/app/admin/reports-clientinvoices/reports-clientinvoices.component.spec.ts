import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsClientinvoicesComponent } from './reports-clientinvoices.component';

describe('ReportsClientinvoicesComponent', () => {
  let component: ReportsClientinvoicesComponent;
  let fixture: ComponentFixture<ReportsClientinvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsClientinvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsClientinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
