import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CELeavesComponent } from './c-e-leaves.component';

describe('CELeavesComponent', () => {
  let component: CELeavesComponent;
  let fixture: ComponentFixture<CELeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CELeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CELeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
