import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatserviceService } from 'src/app/chatservice.service';
import { AlertController } from '@ionic/angular'; // Import AlertController


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {
public contactId:any;
public messages:any[]=[];
public newMessage:any='';
public id:any;
public contactList:any[]=[];
public contactobj:any ={};

constructor(private route:ActivatedRoute,private chatService:ChatserviceService,private router:Router,
  private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
      console.log(this.contactId);
    });
    this.loadMessages();
    this.chatService.getUserData().subscribe((userData) => {
      console.log(userData.id);
      this.id = userData.id;
      console.log(this.id);

    });
    this.contactListfn();
  }
  contactListfn(){
 this.chatService.getContacts(this.id).subscribe((res)=>{
      this.contactList = res[0].get_contact_list.contacts;
      this.contactobj =this.contactList.filter((x)=>x.id == this.contactId)[0];
    });
  }
loadMessages()
{
  this.chatService.getMessages(this.contactId).subscribe((messages) => {
    this.messages = messages[0].get_messages_by_id.contacts;
    console.log(this.messages,'messages');
  });
}
sendMessage() {
  if(this.newMessage.trim()!==''){
  var data:any = {
    sendid:this.id,
    message:this.newMessage,
    receiveid:this.contactId as Number,
    time:new Date()
  }
  console.log(data,'---newmessage');
  this.chatService.sendMessage(data).subscribe(() => {
    this.newMessage = '';
    this.loadMessages(); 
  });
}
}
async confirmDeleteContact() {
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: 'Are you sure you want to delete this contact?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Delete operation canceled');
        },
      },
      {
        text: 'Delete',
        handler: () => {
          // Call your delete contact method here
          this.deleteContact();
         
        },
      },
    ],
  });

  await alert.present();
}


deleteContact()
{
  var x ={
    contactId:this.contactId,
    sender_id:this.id
  }
  this.chatService.deleteContact(x).subscribe((res)=>{
    console.log('deleted');
    this.router.navigate(['/tabs/tab1']);
    this.contactListfn();
  }) 
}
goback()
{
  this.router.navigate(['/tabs/tab1']);
}
}
