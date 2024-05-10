import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit {
  category!: string;
  events!: any[];
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category') ?? '';
    this.eventsService.getEventsByCategory(this.category).pipe(takeUntil(this.unsubscribe$)).subscribe(events => {
      this.events = events;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



}
