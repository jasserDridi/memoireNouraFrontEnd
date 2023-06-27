import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-prestataire-back-office',
  templateUrl: './prestataire-back-office.component.html',
  styleUrls: ['./prestataire-back-office.component.css']
})
export class PrestataireBackOfficeComponent {
  isCollapsed = false;

  constructor(private router:Router) {
  }
  logout() {
    sessionStorage.removeItem("userName");
    this.router.navigate(['/home'])
  }


  goLogin() {
    this.router.navigate(['/home'])

  }

  protected readonly sessionStorage = sessionStorage;
}
