import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    AccessDeniedComponent,
    ErrorPageComponent,
  ],
  imports: [CommonModule, GeneralRoutingModule, SharedModule],
  exports: [NavbarComponent],
})
export class GeneralModule {}
