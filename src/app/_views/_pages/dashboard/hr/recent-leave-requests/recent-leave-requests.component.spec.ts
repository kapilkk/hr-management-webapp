import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLeaveRequestsComponent } from './recent-leave-requests.component';

describe('RecentLeaveRequestsComponent', () => {
  let component: RecentLeaveRequestsComponent;
  let fixture: ComponentFixture<RecentLeaveRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentLeaveRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentLeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
