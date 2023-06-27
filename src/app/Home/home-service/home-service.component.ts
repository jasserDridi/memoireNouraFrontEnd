import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.css']
})
export class HomeServiceComponent {
  protected readonly sessionStorage = sessionStorage;

  constructor(private router:Router) {

  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goLogin() {
    this.router.navigate(['/login'])

  }
}
