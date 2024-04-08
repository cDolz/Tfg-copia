import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // array del año actual -120 años para el select
  years: number[] = Array.from({ length: 120 }, (_, i) => this.currentYear - i);

  // Creo y enlazo el reactive form en el constructor, utilizo mi model
  form!: FormGroup;
  register!: UserData;

  // inyecciones
  signUpService = inject(SignUpService);
  formBuilder = inject(FormBuilder);

  // instancio mi observable para gestionar la desuscripción
  private unsubscribe$ = new Subject<void>();

  constructor() {
    this.initForm();
  }

  // inicio mi formulario con formBuilder, añado validaciones
  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
      ]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      day:['1'],
      month:['Enero'],
      year:['2024']
    })
  }

  // envío datos cuando se pulse el boton de registro
  onSubmit() {

    // reasigno los valores para que concuerden con mi model, fecha concatenada
    this.register = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      surname: this.form.value.surname,
      birthdate: `${this.form.value.day}-${this.form.value.month}-${this.form.value.year}`
    };

    // me subscribo a mi servicio hasta que el componente se descruya
    this.signUpService.register(this.register)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => console.info(v));
  }

  // facilito el acceso a mis controles del formulario
  get f() {
    return this.form.controls;
  }

  // me desuscribo de mi servicio al destruirse el componente
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
