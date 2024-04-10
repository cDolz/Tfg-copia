import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SignUpService } from '../../../services/sign-up.service';
import { UserData } from '../../../models/user.model';

@Component({
  selector: 'app-shared-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnDestroy {

  // cojo el año actual
  currentYear: number = new Date().getFullYear();

  // array del 1 al 31 para select de los días
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  // array para el select de los meses
  months: { name: string, number: string }[] = [
    { name: 'Enero', number: '01' },
    { name: 'Febrero', number: '02' },
    { name: 'Marzo', number: '03' },
    { name: 'Abril', number: '04' },
    { name: 'Mayo', number: '05' },
    { name: 'Junio', number: '06' },
    { name: 'Julio', number: '07' },
    { name: 'Agosto', number: '08' },
    { name: 'Septiembre', number: '09' },
    { name: 'Octubre', number: '10' },
    { name: 'Noviembre', number: '11' },
    { name: 'Diciembre', number: '12' }
  ];

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
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {
    this.initForm();
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
    }, {
      // añado validación personalizada como segundo parámetro
      validators: [
        this.MustMatch('password', 'repeatPassword'),
        this.isAdult('day', 'month', 'year')
      ]
    });
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
        // si no lo son seteo el error
        matchingControl.setErrors({ 'mustMatch': true });
      } else {
        // si son iguales los elimino
        matchingControl.setErrors(null);
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
    this.register = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      surname: this.form.value.surname,
      birthdate: `${this.form.value.day}/${this.form.value.month}/${this.form.value.year}`
    };

    // me subscribo a mi servicio hasta que el componente se descruya
    this.signUpService.register(this.register)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => console.info(v));
  }

  // me desuscribo de mi servicio al destruirse el componente
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
