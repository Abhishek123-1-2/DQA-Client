import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  role: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    if (this.role === 'admin') {
      this.router.navigate(['admin-view']);
    } else if (this.role === 'user') {
      this.router.navigate(['user-menu']);
    }
  }
}
