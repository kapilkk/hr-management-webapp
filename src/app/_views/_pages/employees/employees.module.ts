import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { AddEditEmployeesComponent } from './add-edit-employees/add-edit-employees.component';
import { LayoutsModule } from '../../_layouts/layouts.module';
import { RouterModule, Routes } from '@angular/router';
import { HrGuard } from 'src/app/_core/_guards/hr.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: EmployeesComponent,
    canActivate: [HrGuard]
  },
  {
    path: "edit/:id",
    component: AddEditEmployeesComponent,
    canActivate: [HrGuard]
  }
];

@NgModule({
  declarations: [EmployeesComponent, AddEditEmployeesComponent],
  imports: [
    CommonModule,
    FormsModule,  
    LayoutsModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeesModule { }
