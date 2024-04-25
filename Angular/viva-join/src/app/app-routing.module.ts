import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/common/login/login.component';
import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EventRegisterComponent } from './pages/events/event-register/event-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'register-event', component: EventRegisterComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
