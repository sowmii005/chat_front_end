import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { ToastModule } from 'primeng/toast';
import { LoginPage } from './login.page';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    MessagesModule,
    ToastModule
  ],
  declarations: [LoginPage],
  providers: [
    MessageService
  ],
})
export class LoginPageModule {}
