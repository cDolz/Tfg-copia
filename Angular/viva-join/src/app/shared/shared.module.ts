import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventScrollComponent } from './components/event-scroll/event-scroll.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SwiperModule } from 'swiper/angular';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { EventImgCarouselComponent } from './components/event-img-carousel/event-img-carousel.component';

@NgModule({
    declarations: [LoginFormComponent, SignUpFormComponent, EventScrollComponent, EventInfoComponent, EventImgCarouselComponent],
    exports: [LoginFormComponent, SignUpFormComponent, EventScrollComponent, EventInfoComponent, EventImgCarouselComponent, SwiperModule],
    imports: [CommonModule, SwiperModule]
})
export class SharedModule { }
