import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-event-img-carousel',
  templateUrl: './event-img-carousel.component.html',
  styleUrl: './event-img-carousel.component.scss'
})
export class EventImgCarouselComponent {
  public events: string[] = ['evento1','evento2','evento3','evento4'];
}