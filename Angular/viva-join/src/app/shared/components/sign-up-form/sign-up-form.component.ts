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

  // Creo y enlazo el reactive form en el constructor
  form!: FormGroup;

  register!: UserData;

  // inyecto mi sign-up service
  signUpService = inject(SignUpService);

  formBuilder = inject(FormBuilder);

  private unsubscribe$ = new Subject<void>();

  constructor() {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
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
    this.register = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      surname: this.form.value.surname,
      birthdate: `${this.form.value.day}-${this.form.value.month}-${this.form.value.year}`
    };
    console.log(this.register);
    this.signUpService.register(this.register)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => console.info(v));
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
