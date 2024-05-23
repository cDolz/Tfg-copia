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
  
  // registra un usuario
  register(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/sign-up`, formValue);
  }

  // verifica si un usuario existe en la base de datos
  checkDuplicatedEmail(data: { email: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/check-email`, data);
  }
  
  // obtiene los datos de un usuario por su email
  getUserData( email: string ): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    return this.httpClient.get<any>(`${this.baseUrl}/users/user/${encodedEmail}`);
  }

  // inicia sesión y crea tokens para mantener dicha sesión, los almacena en las cookies
  login(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/login`, formValue).pipe(
      tap(response => {
        if (response.token) {
          Cookies.set('token', response.token, { secure: true, sameSite: 'Strict' });
          Cookies.set('email', response.email, { secure: true, sameSite: 'Strict' });
        }
        return response;
      })
    );
  }

  // metodo para cerrar sesión y eliminar las cookies
  logout(): void {
    Cookies.remove('token');
    Cookies.remove('email');
    this.router.navigate(['/login']);
  }

}