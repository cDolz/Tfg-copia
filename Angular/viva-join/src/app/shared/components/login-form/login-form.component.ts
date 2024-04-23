import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserLoginData } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-shared-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {

  form!: FormGroup;
  login!: UserLoginData;
  private unsubscribe$ = new Subject<void>();
  errorMessage!: string;

  showEmailErrors: boolean = false;
  showPasswordErrors: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.initForm();
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  redirectToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  onSubmit() {

    const { email, password } = this.form.value;
    this.login = { email, password };

    this.authService.login(this.login)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          if (!response.userExists) {
            this.errorMessage = '* Usuario o contraseña incorrectos';
          }          
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


