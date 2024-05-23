import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-shared-event-scroll',
  templateUrl: './event-scroll.component.html',
  styleUrl: './event-scroll.component.scss'
})
export class EventScrollComponent {

  @Input() category!:string;
  @Input() events!: any[];

  @ViewChildren('divSwiper') divSwiperList!: QueryList<ElementRef>;

  @ViewChildren('slideImg') slideImgList!: QueryList<ElementRef>;

  @ViewChildren('slideSpan') slideSpanList!: QueryList<ElementRef>;

  @ViewChild('swiper') swiper!: ElementRef;

  // metodos para añadir animación personalizada al slide
  animateSliders(actualIndex: number) {    
    this.divSwiperList.forEach((element: ElementRef, index: number) => {
      if(index < actualIndex){
        element.nativeElement.style.transform = 'translateX(-9%)';        
      }
      if(index > actualIndex){
        element.nativeElement.style.transform = 'translateX(9%)';        
      }
    });
    this.slideImgList.forEach((element: ElementRef, index: number) => {
      if(index != actualIndex){
        element.nativeElement.style.opacity = 0.5;        
      }
    });
    this.slideSpanList.forEach((element: ElementRef, index: number) => {
      if(index != actualIndex){
        element.nativeElement.style.opacity = 0.5;
      } 
    });
  }

  resetSliders(actualIndex: number) {    
    this.divSwiperList.forEach((element: ElementRef, index: number) => {
      if(index != actualIndex){
        element.nativeElement.style.transform = 'translateX(0%)';
      }
    });
    this.slideImgList.forEach((element: ElementRef, index: number) => {
      if(index != actualIndex){
        element.nativeElement.style.opacity = 1;
      } 
    });
    this.slideSpanList.forEach((element: ElementRef, index: number) => {
      if(index != actualIndex){
        element.nativeElement.style.opacity = 1;
      } 
    });
  }

}
