import { AbstractControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { catchError, debounceTime, map, of } from "rxjs";

export class MyValidators {

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    if (!repeatPassword?.value) {
      return null;
    }
    if (password?.value !== repeatPassword?.value) {
      return repeatPassword?.setErrors({ matchPasswords: true });
    }
    return repeatPassword?.setErrors(null);
  }

  static emailExists(service: AuthService) {
    return (control: AbstractControl) => {
      const data = { email: control.value };
      return service.checkDuplicatedEmail(data).pipe(
        debounceTime(500),
        map(response => response.error ? { 'emailExists': true } : null)
      );
    };
  }
}