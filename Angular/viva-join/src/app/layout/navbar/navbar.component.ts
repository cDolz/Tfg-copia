import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public navBarContent: string[] = ['Inicio', 'Buscar', 'Mis eventos', 'Crear Evento', 'Perfil'];
}
