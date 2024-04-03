import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { LoginModule } from './pages/common/login/login.module';
import { SignUpModule } from './pages/common/sign-up/sign-up.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignUpModule,
    HomePageModule,
    SharedModule,
    HttpClientModule
  ],  
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
