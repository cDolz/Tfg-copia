import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventScrollComponent } from './components/event-scroll/event-scroll.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SwiperModule } from 'swiper/angular';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventRegisterFormComponent } from './components/event-register-form/event-register-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoryMiniatureComponent } from './components/category-miniature/category-miniature.component';
import { RouterModule } from '@angular/router';
import { EventMiniatureComponent } from './components/event-miniature/event-miniature.component';

@NgModule({
    declarations: [LoginFormComponent, SignUpFormComponent, EventScrollComponent, EventInfoComponent, EventRegisterFormComponent, CategoryMiniatureComponent, EventMiniatureComponent ],
    exports: [LoginFormComponent, SignUpFormComponent, EventScrollComponent, EventInfoComponent, SwiperModule, EventRegisterFormComponent, CategoryMiniatureComponent, EventMiniatureComponent ],
    imports: [CommonModule, SwiperModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, RouterModule]
})
export class SharedModule { }
