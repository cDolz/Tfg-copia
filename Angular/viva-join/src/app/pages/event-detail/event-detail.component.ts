import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {
  event!: string;
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

  ngOnInit() {
    this.event = this.route.snapshot.paramMap.get('event') ?? '';
  }
}
