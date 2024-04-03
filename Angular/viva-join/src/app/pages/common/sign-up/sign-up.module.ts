import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [SignUpComponent]
})
export class SignUpModule { }
