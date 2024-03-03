import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { ChatserviceService } from 'src/app/chatservice.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name:string='';
  password:string='';
  successfulLogin:boolean = false;
  messages: Message[]=[];
  loginList:any[]=[];
  loginform:any;
  constructor(private route:Router,
            private chatservice:ChatserviceService,
            private messageService:MessageService,
            private authService: AuthService) { }

  ngOnInit() {
    this.loginform = new FormGroup({
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
    });

    this.getlist();
  }
  getlist(){
  this.chatservice.getLoginusers().subscribe((res)=>{
    this.loginList = res;
  });
  }
  onlogin()
  {
    this.loginList.forEach((item)=>{
      if(item.user_name===this.loginform.get('userName').value && item.password===this.loginform.get('password').value){ 
        this.successfulLogin = true;
        this.chatservice.setUserData({ id: item.id,userName: item.user_name, email: item.email, phone: item.phone, Address: item.address, location: item.country });
        this.messageService.add({ severity: 'success', detail: 'Login Success' });  
        this.authService.setLoggedInUserId(item.id);
        setTimeout(()=>{
          this.route.navigate(['/tabs/tab1']);
        },3000);

      }
    });
          
    if (!this.successfulLogin) {
      this.messageService.add({ severity: 'error', detail: 'Login Failure' });
    }
  }
}
