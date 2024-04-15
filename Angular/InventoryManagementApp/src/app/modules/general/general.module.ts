import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [NavbarComponent, DashboardComponent, HomeComponent, AccessDeniedComponent, ErrorPageComponent],
  imports: [CommonModule, GeneralRoutingModule, FontAwesomeModule],
  exports: [NavbarComponent],
})
export class GeneralModule {}
