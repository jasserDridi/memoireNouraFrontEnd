import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-back-office',
  templateUrl: './admin-back-office.component.html',
  styleUrls: ['./admin-back-office.component.css']
})
export class AdminBackOfficeComponent {
  isCollapsed = false;


  constructor(private router :Router) {


  }
  goLogin() {
    this.router.navigate(['/home'])

  }
  logout() {
    this.sessionStorage.removeItem("userName");
    this.router.navigate(['/home'])
  }

  protected readonly sessionStorage = sessionStorage;
}
