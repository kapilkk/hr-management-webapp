import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEmployeesComponent } from './recent-employees.component';

describe('RecentEmployeesComponent', () => {
  let component: RecentEmployeesComponent;
  let fixture: ComponentFixture<RecentEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
