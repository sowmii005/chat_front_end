import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ForgetPasswordPageRoutingModule } from './forget-password-routing.module';
import { MessageService } from 'primeng/api';
import { ForgetPasswordPage } from './forget-password.page';
import { ToastModule } from 'primeng/toast';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgetPasswordPageRoutingModule,
    ToastModule
  ],
  declarations: [ForgetPasswordPage],
  providers: [
    MessageService
  ],
})
export class ForgetPasswordPageModule {}
