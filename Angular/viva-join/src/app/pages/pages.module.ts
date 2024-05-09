import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './common/login/login.component';
import { SignUpComponent } from './common/sign-up/sign-up.component';
import { EventRegisterComponent } from './event-register/event-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';



@NgModule({
  declarations: [ LoginComponent, SignUpComponent, EventRegisterComponent, HomePageComponent, CategoriesComponent, CategoryDetailComponent, EventDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [LoginComponent, SignUpComponent, EventRegisterComponent, HomePageComponent, CategoriesComponent, CategoryDetailComponent, EventDetailComponent]
})
export class PagesModule { }
