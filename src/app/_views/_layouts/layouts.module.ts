import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from 'src/app/_core/_material_shared/material-shared.module';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [BaseComponent, HeaderComponent, LoaderComponent],
  imports: [
    CommonModule,
    MaterialSharedModule,
    RouterModule
  ],
  exports: [BaseComponent, MaterialSharedModule]
})
export class LayoutsModule { }
