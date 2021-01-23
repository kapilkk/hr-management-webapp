import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrLeavesComponent } from './hr-leaves.component';

describe('HrLeavesComponent', () => {
  let component: HrLeavesComponent;
  let fixture: ComponentFixture<HrLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
