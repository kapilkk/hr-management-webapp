import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEAnalyticsLeavesYearlyComponent } from './c-e-analytics-leaves-yearly.component';

describe('CEAnalyticsLeavesYearlyComponent', () => {
  let component: CEAnalyticsLeavesYearlyComponent;
  let fixture: ComponentFixture<CEAnalyticsLeavesYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEAnalyticsLeavesYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CEAnalyticsLeavesYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
