import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsEmployeeComponent } from './analytics-employee.component';

describe('AnalyticsEmployeeComponent', () => {
  let component: AnalyticsEmployeeComponent;
  let fixture: ComponentFixture<AnalyticsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
