import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  setLoggedInUserId(userId: string) {
    localStorage.setItem('loggedInUserId', userId);
  }

  // Method to retrieve login ID from localStorage
  getLoggedInUserId(): string | null {
    return localStorage.getItem('loggedInUserId');
  }

  // Method to clear login ID from localStorage
  clearLoggedInUserId() {
    localStorage.removeItem('loggedInUserId');
  }
}
