import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAttendanceComponent } from './analytics-attendance.component';

describe('AnalyticsAttendanceComponent', () => {
  let component: AnalyticsAttendanceComponent;
  let fixture: ComponentFixture<AnalyticsAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
