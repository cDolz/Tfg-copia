import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EventsService } from '../../services/events.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pages-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  categories = this.eventsService.getCategories();
  events!: any[][];
  topTenEvents!: any[];

  constructor(private eventsService: EventsService) { }
  
  // obtiene 10 eventos por categoría y los 10 eventos mas populares
  ngOnInit(): void {
    this.events = [];
    for (const category of this.categories) {
      this.eventsService.getTenEventsByCategory(category).pipe(takeUntil(this.unsubscribe$)).subscribe(events => {
        this.events.push(events);
      });
    }
    this.eventsService.getTopTenEvents().pipe(takeUntil(this.unsubscribe$)).subscribe(events => {
      this.topTenEvents = events;
    });
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
