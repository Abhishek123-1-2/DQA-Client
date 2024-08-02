import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarClosed: boolean;

  constructor() {
    
 
  }

  home() {
    // Define your home navigation logic here
  }

  logout() {
    // Define your logout logic here
  }

  toggleSidebar() {
    
  }
}
