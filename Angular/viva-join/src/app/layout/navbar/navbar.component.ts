import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  routes = [
    { path: 'home-page', label: 'Inicio' },
    { path: 'categories', label: 'Categorías' },
    { path: 'event-register', label: 'Crear Evento' },
    { path: 'profile', label: 'Perfil' }
  ];

  constructor(private authService: AuthService) { }

  logout(){
    this.authService.logout();
  }

}
