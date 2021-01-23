import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLeavesSummaryEmployeeComponent } from './hr-leaves-summary-employee.component';

describe('HrLeavesSummaryEmployeeComponent', () => {
  let component: HrLeavesSummaryEmployeeComponent;
  let fixture: ComponentFixture<HrLeavesSummaryEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrLeavesSummaryEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLeavesSummaryEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
