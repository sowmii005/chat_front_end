import { Component, OnInit } from '@angular/core';
import { AuthService } from './authmodule/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    // Check if the user is logged in
    const loggedInUserId = this.authService.getLoggedInUserId();

    if (!loggedInUserId) {      this.router.navigate(['/login']);
    } else {
       console.log('success');
    }
  }
}
