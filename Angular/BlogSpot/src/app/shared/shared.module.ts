import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
const material = [
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatSelectModule,
  MatListModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatChipsModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [material],
})
export class SharedModule {}
