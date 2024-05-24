import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Cookies from 'js-cookie';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SubscriptionsService } from '../../services/subscriptions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  user!: any;
  subscriptions!: any[];
  private unsubscribe$ = new Subject<void>();
  confirmUnsubscribe = false;
  unsubscribeTitle!: string;
  unsubscribeDate!: string;  
  unsubscribeId!: string;

  constructor(private authService: AuthService, private subscriptionsService: SubscriptionsService) { }

  displayConfirmUnsubscribe(display: boolean, title: string, date: string, id: string){
    this.confirmUnsubscribe = display;
    this.unsubscribeTitle = title;
    this.unsubscribeDate = date;    
    this.unsubscribeId = id;
  }

  unsubscribe(){
    this.subscriptionsService.eventUnsubscribe(this.unsubscribeId).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
        this.subscriptions = this.subscriptions.filter(subscription => subscription._id !== this.unsubscribeId);
        this.displayConfirmUnsubscribe(false, '', '', '');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // obtiene la información del usuario y sus suscripciones
  ngOnInit() {
    this.authService.getUserData(Cookies.get('email')!).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(user => {
        this.user = user;
        return this.subscriptionsService.getSubscriptions(user._id).pipe(takeUntil(this.unsubscribe$));
      })
    ).subscribe({
      next: (subscriptions) => {        
        this.subscriptions = subscriptions;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
