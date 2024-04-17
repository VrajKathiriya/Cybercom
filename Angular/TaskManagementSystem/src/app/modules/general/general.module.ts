import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { GeneralRoutingModule } from './general-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent],
  imports: [CommonModule, MaterialModule, GeneralRoutingModule],
  exports: [NavbarComponent],
})
export class GeneralModule {}
