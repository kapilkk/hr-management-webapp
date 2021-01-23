import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_core/_guards/auth.guard';
import { BaseComponent } from './_views/_layouts/base/base.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./_views/_pages/auth/auth.module").then(m => m.AuthModule) 
  },
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./_views/_pages/dashboard/dashboard.module").then(m => m.DashboardModule) 
      },
      {
        path: "leaves",
        loadChildren: () => import("./_views/_pages/leaves/leaves.module").then(m => m.LeavesModule) 
      },
      {
        path: "employees",
        loadChildren: () => import("./_views/_pages/employees/employees.module").then(m => m.EmployeesModule) 
      },
      {
        path: "*",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "dashboard"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
