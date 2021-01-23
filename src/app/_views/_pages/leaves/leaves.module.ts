import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrLeavesComponent } from './hr/hr-leaves/hr-leaves.component';
import { LayoutsModule } from '../../_layouts/layouts.module';
import { RouterModule, Routes } from '@angular/router';
import { CEAddEditLeavesComponent } from './common-employee/c-e-add-edit-leaves/c-e-add-edit-leaves.component';
import { CELeavesComponent } from './common-employee/c-e-leaves/c-e-leaves.component';
import { HrGuard } from 'src/app/_core/_guards/hr.guard';
import { FormsModule } from '@angular/forms';
import { HrLeavesSummaryEmployeeComponent } from './hr/hr-leaves-summary-employee/hr-leaves-summary-employee.component';

const routes: Routes = [
  {
    path: "all",
    component: HrLeavesComponent,
    canActivate: [HrGuard]
  },
  {
    path: "summary/employees/:employeeId",
    component: HrLeavesSummaryEmployeeComponent,
    canActivate: [HrGuard]
  },
  {
    path: "my-leaves",
    component: CELeavesComponent
  },
  {
    path: "edit/:id",
    component: CEAddEditLeavesComponent
  }
];

@NgModule({
  declarations: [
    HrLeavesComponent,
    CELeavesComponent,
    CEAddEditLeavesComponent,
    HrLeavesSummaryEmployeeComponent
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LeavesModule { }
