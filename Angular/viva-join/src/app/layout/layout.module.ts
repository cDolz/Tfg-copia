import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, LayoutComponent, FooterComponent],
  imports: [    
    CommonModule,
    RouterModule,
    PagesModule,
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }