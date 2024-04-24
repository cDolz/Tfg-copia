import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './common/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './common/sign-up/sign-up.component';
import { EventRegisterComponent } from './events/event-register/event-register.component';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [LoginComponent, SignUpComponent, EventRegisterComponent, HomePageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [LoginComponent, SignUpComponent, EventRegisterComponent, HomePageComponent]
})
export class PagesModule { }
