import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // genera meses del año con asignación por nombre y número
  generateMonths() {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames.map((month, index) => {
      return { name: month, number: (index + 1).toString().padStart(2, '0') };
    });
  }  
  
}
