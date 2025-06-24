import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPositionListComponent } from './work-position-list.component';

describe('WorkPositionListComponent', () => {
  let component: WorkPositionListComponent;
  let fixture: ComponentFixture<WorkPositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPositionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
