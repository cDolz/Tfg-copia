import { AbstractControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { debounceTime, map } from "rxjs";

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
        map(response => response.emailExists ? { 'emailExists': true } : null)
      );
    };
  }

  static isAdult(control: AbstractControl) {
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
}