import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayLeavesComponent } from './today-leaves.component';

describe('TodayLeavesComponent', () => {
  let component: TodayLeavesComponent;
  let fixture: ComponentFixture<TodayLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
