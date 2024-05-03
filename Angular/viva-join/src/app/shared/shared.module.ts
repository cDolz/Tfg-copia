import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventScrollComponent } from './components/event-scroll/event-scroll.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SwiperModule } from 'swiper/angular';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { EventImgCarouselComponent } from './components/event-img-carousel/event-img-carousel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventRegisterFormComponent } from './components/event-register-form/event-register-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [LoginFormComponent, SignUpFormComponent, EventScrollComponent, EventInfoComponent, EventImgCarouselComponent, EventRegisterFormComponent],
    exports: [LoginFormComponent, SignUpFormComponent, EventScrollComponent, EventInfoComponent, EventImgCarouselComponent, SwiperModule, EventRegisterFormComponent],
    imports: [CommonModule, SwiperModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule]
})
export class SharedModule { }
