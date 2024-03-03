import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatserviceService } from 'src/app/chatservice.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {
  CountryISO,
  SearchCountryField
} from "ngx-intl-tel-input";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
registerForm:any;
resultData:any={};
public countryList:any[]=[];
public selectedCountry:any;
  constructor(private chatapi:ChatserviceService,
    private message:MessageService,
    private route:Router) { }
  ngOnInit() {
    this.registerForm = new FormGroup({
      uname:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required)
    });
    this.chatapi.getCountry().subscribe((res)=>{
      this.countryList = res;
      console.log(this.countryList);
    })
  }
  onPhoneNumberChange(event: any) {
    console.log('Phone number changed:', event);
  }
  submit()
  {
     if(this.registerForm.valid){
      this.resultData = {
        name: this.registerForm.get('uname').value,
        password: this.registerForm.get('password').value,
        email: this.registerForm.get('email').value,
        phone:this.registerForm.get('phone').value,
        address:this.registerForm.get('address').value,
        country:this.registerForm.get('country').value,
        action:'C'
      }
      console.log(this.registerForm.get('country').value);
      console.log(this.resultData,'-');
      this.chatapi.createNewuser(this.resultData).subscribe((res)=>{
        this.message.add({ severity: 'success', detail: 'Registration Successful' });  
        setTimeout(()=>{
          this.route.navigate(['/login']);
        },2000);
        console.log(res);

      })
     }  
  }

}
