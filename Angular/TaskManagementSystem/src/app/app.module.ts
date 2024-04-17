import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GeneralModule } from './modules/general/general.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    GeneralModule,
    AuthModule,
    UserModule,
    TaskModule,
    ToastrModule.forRoot(),
    MatNativeDateModule,
  ],
  providers: [NativeDateAdapter],
  bootstrap: [AppComponent],
})
export class AppModule {}
