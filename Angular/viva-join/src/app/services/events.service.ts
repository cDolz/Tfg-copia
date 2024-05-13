import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl: string;
  private categories: string[] = [
    'Música',
    'Arte y Cultura',
    'Tecnología',
    'Negocios y Emprendimiento',
    'Salud y Bienestar',
    'Educación',
    'Moda',
    'Gastronomía',
    'Deportes y Aventura',
    'Medio Ambiente y Sostenibilidad',
    'Cine y Teatro',
    'Literatura y Escritura',
    'Viajes y Turismo',
    'Fotografía',
    'Ciencia y Innovación',
    'Religión y Espiritualidad',
    'Historia y Patrimonio',
    'Animales y Naturaleza',
    'Juegos y Entretenimiento',
    'Diseño y Arquitectura'
  ];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // ordena las categorías por orden alfabético
  getCategories(): string[] { return this.categories.sort((a, b) => a.localeCompare(b)); }

  // registra un evento
  register(formData: FormData): Observable<any> {    
    return this.httpClient.post<any>(`${this.baseUrl}/events/register-event`, formData);
  }

  // obtiene los eventos de una categoría
  getEventsByCategory(category: string): Observable<any> {
    const encodedCategory = encodeURIComponent(category);
    return this.httpClient.get<any>(`${this.baseUrl}/events/get-events/${encodedCategory}`);
  }

  // obtiene 10 eventos de una categoría
  getTenEventsByCategory(category: string): Observable<any> {
    const encodedCategory = encodeURIComponent(category);
    return this.httpClient.get<any>(`${this.baseUrl}/events/get-ten-events/${encodedCategory}`);
  }

  // obtiene la información de un evento en concreto
  getEventDetail(title: string): Observable<any> {
    const encodedTitle = encodeURIComponent(title);
    return this.httpClient.get<any>(`${this.baseUrl}/events/get-event/${encodedTitle}`);
  }

  // obtiene los 10 eventos más populares
  getTopTenEvents(): Observable<any> {    
    return this.httpClient.get<any>(`${this.baseUrl}/events/get-top-ten-events`);
  }

}
