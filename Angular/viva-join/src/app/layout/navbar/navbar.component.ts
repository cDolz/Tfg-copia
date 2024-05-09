import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  routes = [
    { path: 'home-page', label: 'Inicio' },
    { path: 'categories', label: 'Categorías' },
    { path: 'event-register', label: 'Crear Evento' }    
  ];

}
