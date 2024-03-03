import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../chatservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
public userName:any;
public email:any;
public userInformation:any;
  constructor(private chatapi:ChatserviceService) {}

  ngOnInit() {
    this.chatapi.getUserData().subscribe((userData) => {
      console.log(userData);
      this.userInformation = userData;
    });
    console.log(this.userInformation);
  }
}
