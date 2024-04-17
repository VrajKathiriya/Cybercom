import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [ErrorPageComponent, AccessDeniedComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule],
})
export class SharedModule {}
