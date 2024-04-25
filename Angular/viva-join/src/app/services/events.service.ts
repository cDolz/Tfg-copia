import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }

  register(formValue: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/events/upload`, formValue);
  }

}
