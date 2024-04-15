import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsdToInrPipe } from './pipes/usd-to-inr.pipe';

@NgModule({
  declarations: [UsdToInrPipe],
  imports: [CommonModule],
  exports: [UsdToInrPipe],
})
export class SharedModule {}
