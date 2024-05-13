import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessGuard implements CanActivate {
  constructor(private router: Router) { }

// Guarda para proteger la ruta de éxito si no viene de una redirección from
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const from = route.queryParamMap.get('from');
    if (from) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}