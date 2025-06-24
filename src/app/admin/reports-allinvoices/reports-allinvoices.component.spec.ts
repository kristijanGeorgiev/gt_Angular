import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAllinvoicesComponent } from './reports-allinvoices.component';

describe('ReportsAllinvoicesComponent', () => {
  let component: ReportsAllinvoicesComponent;
  let fixture: ComponentFixture<ReportsAllinvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsAllinvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsAllinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
