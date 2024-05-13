import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // suscribe a un usuario a un evento
  eventSubscribe(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/subscriptions/subscribe`, formValue);
  }

  // obtiene las suscripciones de un usuario
  getSubscriptions(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/subscriptions/get-subscriptions/${userId}`);
  }

}
