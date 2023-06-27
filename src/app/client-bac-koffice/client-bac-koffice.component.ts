import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-bac-koffice',
  templateUrl: './client-bac-koffice.component.html',
  styleUrls: ['./client-bac-koffice.component.css']
})
export class ClientBacKOfficeComponent {
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
