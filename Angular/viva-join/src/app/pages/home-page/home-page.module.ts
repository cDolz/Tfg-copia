import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }
