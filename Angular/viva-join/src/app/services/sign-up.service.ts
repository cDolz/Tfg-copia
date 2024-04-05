import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  // inyecto mi http client para poder usarlo 
  private httpClient = inject(HttpClient);

  // declaro e inicializo en el constructor la url de las peticiones en el back
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/users';
  }

  register(formValue: any): Observable<any> {    
    return this.httpClient.post<any>(`${this.baseUrl}/sign-up`, formValue);    
  }

}