import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsEmployeeComponent } from './hr/analytics-employee/analytics-employee.component';
import { AnalyticsAttendanceComponent } from './hr/analytics-attendance/analytics-attendance.component';
import { TodayLeavesComponent } from './hr/today-leaves/today-leaves.component';
import { RecentEmployeesComponent } from './hr/recent-employees/recent-employees.component';
import { RecentLeaveRequestsComponent } from './hr/recent-leave-requests/recent-leave-requests.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from '../../_layouts/layouts.module';
import { MaterialSharedModule } from 'src/app/_core/_material_shared/material-shared.module';
import { ChartsModule } from 'ng2-charts';
import { CEAnalyticsLeavesYearlyComponent } from './common-employee/c-e-analytics-leaves-yearly/c-e-analytics-leaves-yearly.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AnalyticsEmployeeComponent,
    AnalyticsAttendanceComponent,
    TodayLeavesComponent,
    RecentEmployeesComponent,
    RecentLeaveRequestsComponent,
    DashboardComponent,
    CEAnalyticsLeavesYearlyComponent
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    MaterialSharedModule,
    RouterModule.forChild(routes),
    ChartsModule
  ]
})
export class DashboardModule { }
