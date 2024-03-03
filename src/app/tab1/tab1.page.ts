import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatserviceService } from '../chatservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
public userInformation:any;
isModalOpen = false;
public id:any;
public contactList:any[]=[];
addcontactform:any;

  constructor(private chatapi:ChatserviceService,private router:Router) {}
ngOnInit() {
    this.addcontactform = new FormGroup({
    name:new FormControl('',Validators.required),
    phonenumber:new FormControl('',Validators.required),
  });
  this.loadContacts();

}
loadContacts() {
  this.chatapi.getUserData().subscribe((userData) => {
    this.id = userData.id;
    this.chatapi.getContacts(this.id).subscribe((res) => {
      this.contactList = res[0].get_contact_list.contacts;
    });
  });
}

onchatClick(contact:any)
{
  console.log(contact.id,'-');
  this.router.navigate(['/tabs/chat', contact.id]);
}
setOpen(isOpen: boolean) 
{
  this.isModalOpen = isOpen;
}
add(){
  if(this.addcontactform.valid){
    var adduser = {
      name:this.addcontactform.get('name').value,
      phone:this.addcontactform.get('phonenumber').value,
      senderid:this.id
    }
    this.chatapi.createnewContact(adduser).subscribe((res)=>{
      console.log(res);
      this.addcontactform.reset();
    });
    this.loadContacts();
  }
}

}
