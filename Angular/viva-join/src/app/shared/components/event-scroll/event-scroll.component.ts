import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-shared-event-scroll',
  templateUrl: './event-scroll.component.html',
  styleUrl: './event-scroll.component.scss'
})
export class EventScrollComponent {

  public events: string[] = ['evento1', 'evento2', 'evento3', 'evento4', 'evento5', 'evento6', 'evento7', 'evento8', 'evento9',
    'evento10', 'evento11', 'evento12', 'evento13', 'evento14', 'evento15'];

  @ViewChildren('divSwiper') divSwiperList!: QueryList<ElementRef>;

  @ViewChildren('slideImg') slideImgList!: QueryList<ElementRef>;

  @ViewChildren('slideSpan') slideSpanList!: QueryList<ElementRef>;

  @ViewChild('swiper') swiper!: ElementRef;

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
