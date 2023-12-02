import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';

import { AuthenticationPage } from './authentication.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EnableNotificationComponent } from './pages/enable-notification/enable-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    SharedModule
  ],
  declarations: [
    AuthenticationPage,
    LoginComponent,
    RegisterComponent,
    EnableNotificationComponent
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationPageModule { }
