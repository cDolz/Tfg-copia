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

  constructor(private authService: AuthService, private subscriptionsService: SubscriptionsService) { }

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
        console.log(subscriptions);
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
