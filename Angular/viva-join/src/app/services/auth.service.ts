import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // declaro e inicializo en el constructor la url de las peticiones en el back
  private baseUrl: string;

  isAuthenticated: boolean = false;
  token!: string;

  constructor(private httpClient: HttpClient) {
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
        if (response.userExists) {
          this.isAuthenticated = true;
          this.token = response.token;
        }
      }
      )
    );
  }

}