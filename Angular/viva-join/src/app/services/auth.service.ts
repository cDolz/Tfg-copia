import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // declaro e inicializo en el constructor la url de las peticiones en el back
  private baseUrl: string;

  token$ = new BehaviorSubject<string | null>(null);

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
      map((response: any) => {        
        this.token$.next(response.token);
      })
    );
  }

}