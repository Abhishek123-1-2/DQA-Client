import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarClosedSubject = new BehaviorSubject<boolean>(false);
  sidebarClosed$ = this.sidebarClosedSubject.asObservable();

  toggleSidebar() {
    this.sidebarClosedSubject.next(!this.sidebarClosedSubject.value);
  }
}
