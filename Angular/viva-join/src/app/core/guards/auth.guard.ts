import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Import your AuthService from the correct file path

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      )
    );
  }

}