import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPositionAddComponent } from './work-position-add.component';

describe('WorkPositionAddComponent', () => {
  let component: WorkPositionAddComponent;
  let fixture: ComponentFixture<WorkPositionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPositionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPositionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
