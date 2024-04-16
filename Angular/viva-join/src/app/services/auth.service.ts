import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // inyecto mi http client para poder usarlo 
  private httpClient = inject(HttpClient);

  // declaro e inicializo en el constructor la url de las peticiones en el back
  private baseUrl: string;

  constructor() {
    this.baseUrl = environment.baseUrl;
  }

  register(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/sign-up`, formValue);
  }

  checkDuplicatedEmail(data: { email: string }): Observable<any> {    
    return this.httpClient.post<any>(`${this.baseUrl}/users/check-email`, data);      
  }

  login(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/login`, formValue);
  }

}