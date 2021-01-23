import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEAddEditLeavesComponent } from './c-e-add-edit-leaves.component';

describe('CEAddEditLeavesComponent', () => {
  let component: CEAddEditLeavesComponent;
  let fixture: ComponentFixture<CEAddEditLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEAddEditLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CEAddEditLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
