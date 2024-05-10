import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Cookies from 'js-cookie';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user: any;
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserData(Cookies.get('email')!).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
