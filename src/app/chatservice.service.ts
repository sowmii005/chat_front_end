import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatserviceService {
  url: string = 'http://localhost:3000';
  countryString:string = '../assets/data.json';
  private userData = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}

  setUserData(data: any) {
    this.userData.next(data);
  }

  getUserData() {
    return this.userData.asObservable();
  }

  getCountry(){
    return this.http.get<any>(`${this.countryString}`);
  }
  getContacts(id:any): Observable<any> {
    console.log(id,'-----');
    return this.http.get<any>(`${this.url}/get-contactlist?id=`+id);
  }
  getMessages(receiveId:any): Observable<any> {
    console.log(receiveId,'-----');
    return this.http.get<any>(`${this.url}/get-messages?receiveId=`+receiveId);
  }
  getLoginusers(): Observable<any> {
    return this.http.get<any>(`${this.url}/loginusers`);
  }

  createNewuser(params: any) {
    return this.http.post<any>(`${this.url}/create-new`, params);
  }
  sendMessage(params:any) {
    console.log('params',params);
    return this.http.post<any>(`${this.url}/messages`, params);
  }
  createnewPassword(params: any) {
    console.log(params);
    return this.http.post<any>(`${this.url}/create-password`, params);
  }

  createnewContact(params: any) {
    return this.http.post<any>(`${this.url}/create-contact`, params);
  }
  deleteContact(params: any) {
    return this.http.post<any>(`${this.url}/delete-contact`, params);
  }
}
