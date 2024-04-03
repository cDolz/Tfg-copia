import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-shared-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {  

  // cojo el año actual
  currentYear: number = new Date().getFullYear();

  // array del 1 al 31 para select de los días
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  // array para el select de los meses
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // array del año actual -120 años para el select
  years: number[] = Array.from({ length: 120 }, (_, i) => this.currentYear - i);
  
}
