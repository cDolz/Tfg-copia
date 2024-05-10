import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  event!: string;
  eventData!: any;
  eventDates!: any[];
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private formBuilder: FormBuilder) {    
    this.initForm();
  }

  ngOnInit() {
    this.event = this.route.snapshot.paramMap.get('event') ?? '';
    this.eventsService.getEventDetail(this.event).pipe(takeUntil(this.unsubscribe$)).subscribe((response: { event: any, eventDates: any[] }) => {
      this.eventData = response.event;
      this.eventDates = response.eventDates;
    });    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {    
    this.form = this.formBuilder.group({
      options: new FormControl('')
    });
  }

  onSubmit() {
    
  }
}
