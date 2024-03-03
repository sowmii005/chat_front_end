import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatserviceService } from 'src/app/chatservice.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  forgetPassword:any;
  constructor(private chatapi:ChatserviceService,private route:Router,private messageService:MessageService) { }
  resultData:any={};
  updateData:any={};
  loginList:any[]=[];
  ngOnInit() {
    this.forgetPassword = new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required)
    });
    this.chatapi.getLoginusers().subscribe((res)=>{
      this.loginList = res;
    });
  }

  submit(){
    if(this.forgetPassword.valid){
     
    this.resultData = this.loginList.filter(item=>item.email == this.forgetPassword.get('email').value)[0];
     console.log(this.resultData.id,'data');
     this.updateData = {
      id :this.resultData.id,
      email: this.resultData.email,
      password: this.forgetPassword.get('confirmPassword').value
     }
      console.log('password reset successful',this.updateData);
      this.chatapi.createnewPassword(this.updateData).subscribe((res=>{
        console.log(res);
        this.messageService.add({ severity: 'success', detail: 'Password reset successful' });    
        setTimeout(()=>{
          this.route.navigate(['/login']);
        },3000);

      }));
    }
    else{
      console.log('failure');
    }
  }
  reset(){
    this.forgetPassword.reset();
  }

}
