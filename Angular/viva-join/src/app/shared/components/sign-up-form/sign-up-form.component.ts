import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UserData } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
  // TODO changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnDestroy {

  // cojo el año actual
  currentYear: number = new Date().getFullYear();

  // array del 1 al 31 para select de los días
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  // array para el select de los meses
  months: { name: string, number: string }[] = this.generateMonths();

  // array del año actual -120 años para el select
  years: number[] = Array.from({ length: 120 }, (_, i) => this.currentYear - i);

  // variables para mostrar errores en el formulario
  showNameErrors: boolean = false;
  showSurnameErrors: boolean = false;
  showEmailErrors: boolean = false;
  showPasswordErrors: boolean = false;
  showRepeatPasswordErrors: boolean = false;
  showDateErrors: boolean = false;

  // Creo y enlazo el reactive form en el constructor, utilizo mi model
  form!: FormGroup;
  register!: UserData;  

  // instancio mi observable para gestionar la desuscripción
  private unsubscribe$ = new Subject<void>();

  // inyecciones en el constructor
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.initForm();
  }

  // genero los meses para el select
  generateMonths() {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames.map((month, index) => {
      return { name: month, number: (index + 1).toString().padStart(2, '0') };
    });
  }

  // marco los select como touched cuando haga focus en uno de ellos
  markSelectAsTouched() {
    this.form.get('day')?.markAsTouched();
    this.form.get('month')?.markAsTouched();
    this.form.get('year')?.markAsTouched();
  }

  // inicio mi formulario con formBuilder, añado validaciones
  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&\\.#_-])[A-Za-z\\d$@$!%*?&\\.#_-]{8,}$')
      ]],
      repeatPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      day: ['01'],
      month: ['01'],
      year: ['2024']
    // }, {
    //   // añado validación personalizada como segundo parámetro
    //   validators: [
    //     this.MustMatch('password', 'repeatPassword'),
    //     this.isAdult('day', 'month', 'year')
    //   ]    
    });
    this.form.setValidators(this.mustMatch('password', 'repeatPassword'));
  }

  // facilito el acceso a mis controles del formulario
  get f() {
    return this.form.controls;
  }

  // valido si mi contraseña repetida es igual que la original
  private MustMatch(controlName: string, matchingControlName: string) {
    // retorno la función que llamaré desde el FormBuilder
    return (formGroup: FormGroup) => {
      // obtengo los controles
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // Compruebo si hay otros errores para no sobreescribirlos
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      // compruebo si los valores son iguales
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ 'mustMatch': true }); // si no lo son seteo el error
      } else {
        matchingControl.setErrors(null); // si son iguales los elimino
      }
    }
  }

  // valido si el usuario es mayor de edad
  private isAdult(day: string, month: string, year: string) {
    // retorno la función que llamaré desde el FormBuilder
    return (formGroup: FormGroup) => {
      // obtengo los controles
      const dayControl = formGroup.controls[day];
      const monthControl = formGroup.controls[month];
      const yearControl = formGroup.controls[year];

      // creo la fecha de cumpleaños y la actual -18 años atrás para comparar
      if (dayControl && monthControl && yearControl && dayControl.value && monthControl.value && yearControl.value) {
        const birthdate = new Date(yearControl.value, monthControl.value - 1, dayControl.value);
        const currentDate = new Date();
        const adultDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        if (birthdate > adultDate) {
          dayControl.setErrors({ notAdult: true });
          monthControl.setErrors({ notAdult: true });
          yearControl.setErrors({ notAdult: true });
        } else {
          dayControl.setErrors(null);
          monthControl.setErrors(null);
          yearControl.setErrors(null);
        }
      }
    }
  }

  // envío datos cuando se pulse el boton de registro
  onSubmit() {

    // reasigno los valores para que concuerden con mi model, fecha concatenada
    const { email, password, name, surname, day, month, year } = this.form.value;
    this.register = {
      email,
      password,
      name,
      surname,
      birthdate: `${day}/${month}/${year}`
    };

    // me subscribo a mi servicio hasta que el componente se destruya
    this.authService.register(this.register)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  // me desuscribo de mi servicio al destruirse el componente
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
