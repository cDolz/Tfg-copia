import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuscriptionData } from '../../models/suscription.model';
import { AuthService } from '../../services/auth.service';
import Cookies from 'js-cookie';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { MyValidators } from '../../utils/validators/validators';

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
  user!: any;
  suscription!: SuscriptionData;
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router, private eventsService: EventsService, private formBuilder: FormBuilder, private authService: AuthService, private subscriptionsService: SubscriptionsService) {    
    this.initForm();
  }

  // recibe como parametros todas las fechas disponibles para el evento, la información del evento y el usuario para el registro
  ngOnInit() {
    this.event = this.route.snapshot.paramMap.get('event') ?? '';
    this.eventsService.getEventDetail(this.event).pipe(takeUntil(this.unsubscribe$)).subscribe((response: { event: any, eventDates: any[] }) => {
      this.eventData = response.event;
      this.eventDates = response.eventDates;
    });
    this.authService.getUserData(Cookies.get('email')!).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error(err);
      }
    });    
  }

  initForm() {
    this.form = this.formBuilder.group({
      options: new FormControl('', Validators.required)
    });
  }

  // registra suscripciones en la base de datos y redirecciona a la pagina de éxito
  onSubmit() {
    const { options } = this.form.value;
    this.suscription = {
      userId: this.user._id,
      eventId: this.eventData._id,
      eventDateId: options
    };
    this.subscriptionsService.eventSubscribe(this.suscription).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (response) => {        
        this.router.navigate(['home/success'], { queryParams: { from: this.router.url } });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
