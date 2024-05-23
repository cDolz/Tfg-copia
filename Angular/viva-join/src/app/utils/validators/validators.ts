import { AbstractControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { debounceTime, map, tap } from "rxjs";
import { EventRegisterDateData } from "../../models/event.model";

export class MyValidators {

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword');
    if (!password) {
      repeatPassword?.setErrors({ required: true });
    } else {
      const passwordsMatch = password === repeatPassword?.value;
      repeatPassword?.setErrors(passwordsMatch ? null : { matchPasswords: true });
    }
    return null;
  }

  static emailExists(service: AuthService) {
    return (control: AbstractControl) => {
      const data = { email: control.value };
      return service.checkDuplicatedEmail(data).pipe(
        debounceTime(500),
        map((response: any) => response.emailExists ? { 'emailExists': true } : null as any) // Add type assertion
      );
    };
  }

  // Validación personalizada para comprobar si el usuario es mayor de edad
  static isAdult(control: AbstractControl) {
    // Obtengo los controles de día, mes y año
    const dayControl = control.get('day');
    const monthControl = control.get('month');
    const yearControl = control.get('year');
    const controls = [dayControl, monthControl, yearControl];

    if (controls.every(c => c && c.value)) {
      const birthdate = new Date(yearControl?.value, monthControl?.value - 1, dayControl?.value);
      const currentDate = new Date();
      const adultDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      const error = birthdate > adultDate ? { notAdult: true } : null;

      controls.forEach(c => c?.setErrors(error));
    }
  }

  static trimValueAndCheck(control: AbstractControl) {
    const trimmedValue = control.value.replace(/\s+/g, ' ').trim();
    if (!trimmedValue) {
      return { 'valueIsEmpty': true };
    }
    return null;
  }

  static maxEntries(control: AbstractControl) {
    if (control.value > 10) {
      control.setValue(10);
    }
  }

  static maxParticipants(control: AbstractControl) {
    if (control.value > 200) {
      control.setValue(200);
    }
  }

  static minDuration(control: AbstractControl) {
    const hours = control.get('durationHours')?.value;
    const minutes = control.get('durationMinutes')?.value;
    if (hours === '00' && minutes === '00') {
      control.get('durationHours')?.setErrors({ minDuration: true });
      control.get('durationMinutes')?.setErrors({ minDuration: true });
    } else {
      control.get('durationHours')?.setErrors(null);
      control.get('durationMinutes')?.setErrors(null);
    }
  }

  static datesRegisterUnique(years: number[]) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const dates = control.value;
      const arrayOfDates: EventRegisterDateData[] = [];
      console.log(years);
      for (let i = 0; i < dates.length; i++) {
        console.log(years[i], dates[i][1], dates[i][0], dates[i][2], dates[i][3]);
        const datesRegister = {
          date: new Date(years[i], dates[i][1] - 1, dates[i][0], dates[i][2], dates[i][3])
        };          
        const isDuplicate = arrayOfDates.some(existingDate => 
          existingDate.date.getTime() === datesRegister.date.getTime()
        );          
        if (isDuplicate) {
          return { 'datesRegisterUnique': { value: control.value } };
        }  
        arrayOfDates.push(datesRegister);
      }      
      return null;
    };
  }
  
}