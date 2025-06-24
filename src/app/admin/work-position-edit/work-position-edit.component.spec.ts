import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPositionEditComponent } from './work-position-edit.component';

describe('WorkPositionEditComponent', () => {
  let component: WorkPositionEditComponent;
  let fixture: ComponentFixture<WorkPositionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPositionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
