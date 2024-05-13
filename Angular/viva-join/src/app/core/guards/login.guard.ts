import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  // Guarda para verificar que si hay token, no hay acceso a login y registro
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = Cookies.get('token');

    if (token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;

  }

}