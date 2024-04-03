import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent {
  constructor(private router: Router){

  }
  redirectToSignUp() {
    this.router.navigate(['/sign-up']);
  }

}
