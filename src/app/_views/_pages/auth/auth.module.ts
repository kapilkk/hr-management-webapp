import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialSharedModule } from 'src/app/_core/_material_shared/material-shared.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: "login", 
    component: LoginComponent 
  }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
