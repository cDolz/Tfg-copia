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

  getCategories(): string[] { return this.categories; }

  register(formData: FormData): Observable<any> {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    return this.httpClient.post<any>(`${this.baseUrl}/events/upload`, formData);
  }

}
