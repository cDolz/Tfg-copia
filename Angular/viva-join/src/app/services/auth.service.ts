import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // declaro e inicializo en el constructor la url de las peticiones en el back
  private baseUrl: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseUrl = environment.baseUrl;
  }
  
  register(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/sign-up`, formValue);
  }

  checkDuplicatedEmail(data: { email: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/check-email`, data);
  }


  login(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/login`, formValue).pipe(
      tap(response => {
        if (response && response.token) {
          Cookies.set('token', response.token, { secure: true, sameSite: 'Strict' });
        }
        return response;
      })
    );
  }

  logout(): void {
    Cookies.remove('token');
    this.router.navigate(['/login']);
  }

}