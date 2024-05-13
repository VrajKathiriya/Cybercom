import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
