import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/common/login/login.component';
import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventRegisterComponent } from './pages/event-register/event-register.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard]},
  { path: 'home', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'home-page', pathMatch: 'full'},
    {path: 'home-page', component: HomePageComponent},
    {path: 'event-register', component: EventRegisterComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'category/:category', component: CategoryDetailComponent},
    {path: 'event/:event', component: EventDetailComponent},
    {path: 'profile', component: ProfileComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
